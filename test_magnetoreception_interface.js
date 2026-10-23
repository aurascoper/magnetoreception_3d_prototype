#!/usr/bin/env node
/**
 * Regression Test Suite for 3D Magnetoreception, Biomagnetic Walk Null Explorer & Multiphysics-GLMM Interface
 *
 * Verifies:
 * 1. Schema & Epistemic Manifest Integrity (3 systems, 8 mechanisms, P1-P4 causal gap, Biomagnetic Walk Null Explorer,
 *    Revised 5-Row Planned-Contrast Matrix [15 vs. 24 cells], 4-Layer Multiphysics & GLMM Architecture, 0 em/en-dashes)
 * 2. Normal 3-D WebGL Rendering (#glField sized, 3-system nodes rendered, ferritin thermal bound verified)
 * 3. Biomagnetic Walk Null Explorer & Interactive Factorial Experiment Sequence (H0-A vs H0-B, 15/16 phase locking,
 *    Gates 0-4, Rows 1-5 including 180 deg field reversal, Layers A-D)
 * 4. Disabled-WebGL Exception Fallback (--disable-webgl -> #canvas2d fallback)
 */

const assert = require('assert');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = __dirname;
const CHROME_BIN = process.env.CHROME_BIN || (
  fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : (fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : '/usr/bin/chromium-browser')
);

function verifyFilesAndManifest() {
  for (const rel of ['evidence_manifest.json', 'index.html', 'README.md']) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.strictEqual(content.includes('\u2014'), false, `${rel} contains em-dash`);
    assert.strictEqual(content.includes('\u2013'), false, `${rel} contains en-dash`);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'evidence_manifest.json'), 'utf8'));
  assert.strictEqual(manifest.schema_version, '2.2.0', 'Expected schema_version 2.2.0');
  assert.strictEqual(manifest.systems.length, 3, 'Expected 3 distinct systems in evidence_manifest.json');
  assert.strictEqual(manifest.main_causal_gap_propositions.length, 4, 'Expected 4 causal gap propositions (P1-P4)');
  assert.strictEqual(manifest.factorial_experiments.length, 4, 'Expected 4 factorial experiments (A-D)');
  const bw = manifest.biomagnetic_walk_null_explorer;
  assert.ok(bw, 'Missing biomagnetic_walk_null_explorer in evidence_manifest.json');
  assert.strictEqual(bw.null_hypotheses.length, 2, 'Expected Null H0-A and Null H0-B');
  assert.strictEqual(bw.cpm_sp_v1_growth_off_256_seeds.hazard_commitments_survival_only, 5511);
  assert.strictEqual(bw.cpm_sp_v1_growth_off_256_seeds.total_parcels, 10752);
  assert.strictEqual(bw.cpm_sp_v1_growth_off_256_seeds.species_rows.length, 7);
  assert.strictEqual(bw.phase_locking_and_controls.three_required_phase_controls.length, 3);
  assert.strictEqual(bw.experimental_design_note.planned_contrast_cells, 15);
  assert.strictEqual(bw.experimental_design_note.full_crossed_factorial_cells, 24);
  assert.strictEqual(bw.five_row_factorial_matrix.length, 5, 'Expected Revised 5-Row Planned-Contrast Matrix');
  assert.strictEqual(bw.decision_gates_0_to_4.length, 5, 'Expected 5 Decision Gates (Gate 0 to Gate 4)');
  assert.strictEqual(bw.multiphysics_and_glmm_architecture.layers.length, 4, 'Expected 4 Multiphysics & GLMM Layers (A-D)');
  console.log('PASS [1/4]: Manifest v2.2.0, Biomagnetic Walk (H0-A/H0-B & 15/16 phase lock), 5-row (15-cell) matrix, and 4-Layer Multiphysics-GLMM verified.');
}

function startStaticServer(port) {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const u = req.url.split('?')[0].split('#')[0];
      const fp = path.join(ROOT, u === '/' ? 'index.html' : u.slice(1));
      if (!fs.existsSync(fp)) {
        res.writeHead(404);
        return res.end();
      }
      const ext = path.extname(fp);
      const mime = ext === '.html' ? 'text/html' : ext === '.json' ? 'application/json' : 'text/plain';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(fs.readFileSync(fp));
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function withChromeSession(chromeFlags, port, debugPort, fn) {
  const userDataDir = `/tmp/magneto-test-chrome-${debugPort}-${Date.now()}`;
  const chrome = spawn(CHROME_BIN, [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${debugPort}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    ...chromeFlags,
    `http://127.0.0.1:${port}/index.html`
  ]);

  try {
    let tabs = null;
    for (let attempt = 0; attempt < 25; attempt++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        tabs = await fetch(`http://127.0.0.1:${debugPort}/json`).then(r => r.json());
        if (tabs && tabs.some(t => t.type === 'page' && t.url.includes('index.html'))) break;
      } catch (_) {}
    }
    const page = tabs.find(t => t.type === 'page' && t.url.includes('index.html'));
    assert.ok(page, 'Failed to attach to index.html in headless Chrome');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r));

    let msgId = 0;
    const call = (method, params = {}) =>
      new Promise(resolve => {
        const cid = ++msgId;
        const handler = ev => {
          const msg = JSON.parse(ev.data);
          if (msg.id === cid) {
            ws.removeEventListener('message', handler);
            resolve(msg);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: cid, method, params }));
      });

    await call('Runtime.enable');
    const evalJson = async expr => {
      const res = await call('Runtime.evaluate', { expression: expr, returnByValue: true });
      if (res.result && res.result.exceptionDetails) {
        throw new Error(res.result.exceptionDetails.exception.description || 'Runtime.evaluate error');
      }
      return JSON.parse(res.result.result.value);
    };

    await fn(evalJson);
    ws.close();
  } finally {
    chrome.kill();
  }
}

async function run() {
  verifyFilesAndManifest();

  const port = 8779;
  const server = await startStaticServer(port);

  try {
    await withChromeSession(
      ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
      port,
      9241,
      async evalJson => {
        const state3d = await evalJson(`(() => {
          const gl = document.getElementById('glField');
          const c2d = document.getElementById('canvas2d');
          const sysCols = document.querySelectorAll('#threeSystemsGrid .sys-col').length;
          const sysNodes = document.querySelectorAll('#threeSystemsGrid .sys-node').length;
          const propCards = document.querySelectorAll('#causalGapGrid .prop-card').length;
          const selRows = document.querySelectorAll('#selectionAuditBody tr').length;
          const fiveRows = document.querySelectorAll('#fiveRowMatrixBody tr').length;
          const mpLayers = document.querySelectorAll('#multiphysicsLayersGrid .ctrl-box').length;
          const glmmRows = document.querySelectorAll('#glmmEndpointBody tr').length;
          const integrity = window.verifyBiomagneticWalkIntegrity();
          return JSON.stringify({
            glWidth: gl.width,
            glHeight: gl.height,
            glHidden: gl.hidden,
            c2dHidden: c2d.hidden,
            sysCols,
            sysNodes,
            propCards,
            selRows,
            fiveRows,
            mpLayers,
            glmmRows,
            integrity,
            ferritinVal: document.getElementById('kpiFerritin').textContent,
            larmorVal: document.getElementById('kpiCryFreq').textContent
          });
        })()`);
        assert.ok(state3d.glWidth > 400 && state3d.glHeight > 350, `Expected sized 3D canvas, got ${state3d.glWidth}x${state3d.glHeight}`);
        assert.strictEqual(state3d.glHidden, false);
        assert.strictEqual(state3d.c2dHidden, true);
        assert.strictEqual(state3d.sysCols, 3, 'Expected 3 system columns rendered');
        assert.strictEqual(state3d.sysNodes, 10, 'Expected 10 causal nodes across the 3 systems');
        assert.strictEqual(state3d.propCards, 4, 'Expected 4 Main Causal Gap proposition cards (P1-P4)');
        assert.strictEqual(state3d.selRows, 7, 'Expected 7 species rows in cpm-sp-v1 selection vs. displacement table');
        assert.strictEqual(state3d.fiveRows, 5, 'Expected 5 rows in Revised Planned-Contrast Matrix');
        assert.strictEqual(state3d.mpLayers, 4, 'Expected 4 Multiphysics & GLMM layer cards (Layers A-D)');
        assert.strictEqual(state3d.glmmRows, 5, 'Expected 5 GLMM endpoint model rows');
        assert.strictEqual(state3d.integrity.all_displacement_cis_span_zero, true);
        assert.strictEqual(state3d.integrity.hazard_commitments, 5511);
        assert.strictEqual(state3d.integrity.planned_contrast_cells, 15);
        assert.strictEqual(state3d.integrity.full_crossed_factorial_cells, 24);
        assert.strictEqual(state3d.ferritinVal, '3.3e-5 k_B T');
        assert.strictEqual(state3d.larmorVal, '1.40 MHz');
        console.log(`PASS [2/4]: 3-D WebGL scene (${state3d.glWidth}x${state3d.glHeight}), 7-species selection table, 5-row matrix, and 4-layer GLMM table verified.`);

        const factState = await evalJson(`(() => {
          document.getElementById('btnRenderBiomagWalk').click();
          const walk2dHidden = document.getElementById('canvas2d').hidden;
          document.getElementById('btnWalkModePhase').click();
          const phaseBtnOn = document.getElementById('btnWalkModePhase').classList.contains('on');

          document.getElementById('btnExpB').click();
          const expBSpin = document.getElementById('factReadoutSpin').textContent;
          document.getElementById('btnMagRev').click();
          const revSpin = document.getElementById('factReadoutSpin').textContent;
          const revTip = document.getElementById('factReadoutTip').textContent;
          document.getElementById('btnExpC').click();
          const expCMel = document.getElementById('factReadoutMel').textContent;
          const expCTip = document.getElementById('factReadoutTip').textContent;
          document.getElementById('btnExpD').click();
          const expDMito = document.getElementById('factReadoutMito').textContent;
          return JSON.stringify({ walk2dHidden, phaseBtnOn, expBSpin, revSpin, revTip, expCMel, expCTip, expDMito });
        })()`);
        assert.strictEqual(factState.walk2dHidden, false, 'Expected Biomagnetic Walk canvas visible');
        assert.strictEqual(factState.phaseBtnOn, true, 'Expected Phase Order R(t) sub-mode active');
        assert.ok(factState.expBSpin.includes('+90 deg'), `Unexpected Exp B spin readout: ${factState.expBSpin}`);
        assert.ok(factState.revSpin.includes('180 deg'), `Unexpected Row 4 180 deg reversal readout: ${factState.revSpin}`);
        assert.ok(factState.revTip.includes('Inverts') && factState.revTip.includes('Invariant'), `Unexpected Row 4 tip readout: ${factState.revTip}`);
        assert.ok(factState.expCMel.includes('No Melanin'), `Unexpected Exp C melanin readout: ${factState.expCMel}`);
        assert.ok(factState.expCTip.includes('Route A') && factState.expCTip.includes('Route B'), `Unexpected Exp C tip readout: ${factState.expCTip}`);
        assert.ok(factState.expDMito.includes('CLAMPED'), `Unexpected Exp D mito readout: ${factState.expDMito}`);
        console.log('PASS [3/4]: Biomagnetic Walk Null Explorer canvas & Revised 5-Row Factorial Simulator (including 180 deg reversal) verified.');
      }
    );

    await withChromeSession(
      ['--disable-webgl', '--disable-webgl2'],
      port,
      9242,
      async evalJson => {
        const fbState = await evalJson(`(() => {
          const gl = document.getElementById('glField');
          const c2d = document.getElementById('canvas2d');
          return JSON.stringify({
            glHidden: gl.hidden,
            c2dHidden: c2d.hidden,
            c2dWidth: c2d.width,
            c2dHeight: c2d.height,
            btn3dDisabled: document.getElementById('btnRender3d').disabled
          });
        })()`);
        assert.strictEqual(fbState.glHidden, true);
        assert.strictEqual(fbState.c2dHidden, false);
        assert.ok(fbState.c2dWidth > 400 && fbState.c2dHeight > 350);
        assert.strictEqual(fbState.btn3dDisabled, true);
        console.log(`PASS [4/4]: Disabled-WebGL 2-D fallback verified (${fbState.c2dWidth}x${fbState.c2dHeight}).`);
      }
    );
  } finally {
    server.close();
  }
}

run().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});

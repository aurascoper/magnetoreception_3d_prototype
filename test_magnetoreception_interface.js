#!/usr/bin/env node
/**
 * Interface & Regression Audit Suite for 3D Magnetoreception, Biomagnetic Walk Null Explorer & Multiphysics-GLMM UI
 *
 * SCOPE DISCLAIMER (Red-Team Finding 8):
 * This test suite is a SOFTWARE INTERFACE AND REGRESSION AUDIT. It verifies DOM rendering, WebGL/2D canvas
 * fallback, manifest schema bindings, and interactive UI state transitions. Passing this suite does NOT
 * validate biological magnetoreception or fungal radiotropism. First-principles physical calculation
 * provenance, trajectory counterfactual invariants, and linear-model design-matrix rank/estimability are
 * tested separately in `test_calculation_provenance_and_invariants.js`.
 *
 * Verifies:
 * 1. Schema & Epistemic Manifest Integrity + Scientific Calculation Provenance Suite
 * 2. Normal 3-D WebGL Rendering (#glField sized, 3-system nodes & 9 directed edges rendered, per-edge badges,
 *    preregistered angular curves, 15-vs-24 cell estimability ledger, exposure controls, strain gates, ferritin bound)
 * 3. Biomagnetic Walk Null Explorer & Interactive Factorial Experiment Sequence (H0-A vs H0-B, 15/16 phase locking,
 *    Gates 0-4, Rows 1-5 including 180 deg field reversal within full angular curve, Layers A-D staged roadmap)
 * 4. Disabled-WebGL Exception Fallback (--disable-webgl -> #canvas2d fallback)
 */

const assert = require('assert');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');
const { runAll: runProvenanceAndInvariantsSuite } = require('./test_calculation_provenance_and_invariants.js');

const ROOT = __dirname;
const CHROME_BIN = process.env.CHROME_BIN || (
  fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : (fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : '/usr/bin/chromium-browser')
);

function verifyFilesAndManifest() {
  for (const rel of ['evidence_manifest.json', 'index.html', 'README.md', 'test_calculation_provenance_and_invariants.js']) {
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
  assert.ok(bw.phase_locking_and_controls.matched_connectivity_and_lineage_control);
  assert.strictEqual(bw.experimental_design_note.planned_contrast_cells, 15);
  assert.strictEqual(bw.experimental_design_note.full_crossed_factorial_cells, 24);
  assert.strictEqual(bw.experimental_design_note.estimability_and_aliasing_ledger.length, 4);
  assert.strictEqual(bw.preregistered_angular_response_curves.candidate_curve_models.length, 4);
  assert.strictEqual(bw.organism_and_genetic_validation_requirements.mandatory_validation_gates.length, 5);
  assert.strictEqual(bw.five_row_factorial_matrix.length, 5, 'Expected Revised 5-Row Planned-Contrast Matrix');
  assert.strictEqual(bw.decision_gates_0_to_4.length, 5, 'Expected 5 Decision Gates (Gate 0 to Gate 4)');
  assert.strictEqual(bw.multiphysics_and_glmm_architecture.layers.length, 4, 'Expected 4 Multiphysics & GLMM Layers (A-D)');

  const cdeg = manifest.cross_domain_epistemic_gates;
  assert.ok(cdeg, 'Missing cross_domain_epistemic_gates in evidence_manifest.json');
  assert.strictEqual(cdeg.section_version, '1.2.0');
  assert.strictEqual(cdeg.calculation_source_provenance.julia_source_commit, 'f17892ed08f274ca76ca9f2a31c01acd98f089b4');
  assert.strictEqual(cdeg.calculation_source_provenance.source_file, 'src/track4_mineral_magnetoreception_gates.jl');
  assert.strictEqual(cdeg.calculation_source_provenance.superseded_verification_attempts.length, 3);
  assert.strictEqual(cdeg.modeled_interaction_energy_comparison.evidence_type, 'MODELED');
  assert.strictEqual(cdeg.modeled_interaction_energy_comparison.biological_sensing_established_by_calculation, false);
  assert.strictEqual(cdeg.modeled_interaction_energy_comparison.field_key, 'u_mag_over_kBT');
  assert.strictEqual(cdeg.modeled_interaction_energy_comparison.models.magnetosome_chain_model.angular_response_model.is_universal_binary_discriminator, false);
  assert.strictEqual(cdeg.modeled_interaction_energy_comparison.models.cryptochrome_zeeman_timescale.is_demonstrated_biological_coherence_threshold, false);
  const incSens = cdeg.modeled_interaction_energy_comparison.models.biotite_inclusion_free_paramagnetic_model.natural_1um3_flake_magnetite_inclusion_sensitivity;
  assert.strictEqual(incSens.idealized_saturated_coherently_blocked_upper_bound.is_realistic_natural_default, false);
  assert.strictEqual(incSens.partially_remanent_natural_nrm_blocked_regime.is_realistic_natural_default, false);
  assert.strictEqual(incSens.unblocked_superparamagnetic_or_low_field_induced_regime.is_realistic_natural_default, false);
  assert.strictEqual(incSens.unblocked_superparamagnetic_or_low_field_induced_regime.directional_torque_requires_anisotropy, true);
  assert.strictEqual(incSens.unblocked_superparamagnetic_or_low_field_induced_regime.isotropic_b2_energy_generates_uniform_field_torque, false);
  assert.strictEqual(incSens.irradiation_defect_transfer_boundary.is_coercivity_or_remanence_shift_sign_universal, false);
  assert.strictEqual(incSens.irradiation_defect_transfer_boundary.engineering_alloy_to_natural_biotite_transfer_calibrated, false);
  assert.strictEqual(incSens.irradiation_defect_transfer_boundary.empirical_contrasts.length, 2);
  assert.ok(incSens.partially_remanent_natural_nrm_blocked_regime.trace_0_01pct_fe3o4 < 0.01);
  assert.ok(incSens.unblocked_superparamagnetic_or_low_field_induced_regime.isotropic_u_mag_over_kBT.minor_1pct_fe3o4 < 0.01);
  assert.strictEqual(cdeg.gates.length, 4, 'Expected 4 cross-domain epistemic gates (EG-1 to EG-4)');
  assert.deepStrictEqual(cdeg.gates.map(g => g.gate_id), ['EG-1', 'EG-2', 'EG-3', 'EG-4']);
  assert.strictEqual(cdeg.gates[0].oklo_reactor_zone_biotite_verified, false);
  assert.ok(cdeg.gates[0].oklo_documented_minerals.includes('illite') && cdeg.gates[0].oklo_documented_minerals.includes('chlorite'));
  for (const g of cdeg.gates) {
    for (const reqKey of ['gate_id', 'title', 'what_promotion_requires', 'status', 'claim', 'evidence_type', 'sources', 'assumptions', 'limitations', 'promotion_criteria']) {
      assert.ok(g[reqKey] !== undefined, `Gate ${g.gate_id} missing required field ${reqKey}`);
    }
  }

  runProvenanceAndInvariantsSuite();
  console.log('PASS [1/4]: Manifest v2.2.0, Red-Team Provenance & Invariants Suite, Cross-Domain Epistemic Gates (EG-1..EG-4), Biomagnetic Walk, 5-row/24-cell matrix, and 4-Layer Multiphysics-GLMM verified.');
}

function startStaticServer(preferredPort = 0) {
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
    server.listen(preferredPort, '127.0.0.1', () => resolve(server));
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

  const server = await startStaticServer(0);
  const port = server.address().port;
  const baseDebugPort = 9310 + (process.pid % 400);

  try {
    await withChromeSession(
      ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
      port,
      baseDebugPort,
      async evalJson => {
        const state3d = await evalJson(`(() => {
          const gl = document.getElementById('glField');
          const c2d = document.getElementById('canvas2d');
          const sysCols = document.querySelectorAll('#threeSystemsGrid .sys-col').length;
          const sysNodes = document.querySelectorAll('#threeSystemsGrid .sys-node').length;
          const sysEdges = document.querySelectorAll('#threeSystemsGrid .sys-edge').length;
          const mechEdgeBadges = document.querySelectorAll('.mech-edge-badge').length;
          const stageEdgePills = document.querySelectorAll('#stageEdgeLegend .stage-edge-pill').length;
          const propCards = document.querySelectorAll('#causalGapGrid .prop-card').length;
          const selRows = document.querySelectorAll('#selectionAuditBody tr').length;
          const angularRows = document.querySelectorAll('#angularCurveBody tr').length;
          const angularCols = document.querySelectorAll('#angularCurveTable thead th').length;
          const estimabilityRows = document.querySelectorAll('#estimabilityBody tr').length;
          const fiveRows = document.querySelectorAll('#fiveRowMatrixBody tr').length;
          const exposureBoxes = document.querySelectorAll('#exposureControlsGrid .ctrl-box').length;
          const strainBoxes = document.querySelectorAll('#strainValidationGrid .ctrl-box').length;
          const mpLayers = document.querySelectorAll('#multiphysicsLayersGrid .ctrl-box').length;
          const glmmRows = document.querySelectorAll('#glmmEndpointBody tr').length;
          const integrity = window.verifyBiomagneticWalkIntegrity();
          const biophys = window.computeBiophysicsAt(0.05, 0.0, 0.0, 'sensing_cryptochrome');
          const hasCoarseBadgeInMechList = Array.from(document.querySelectorAll('.mech-card')).some(el =>
            el.textContent.includes('OBSERVED / MODELED / HYPOTHESIZED')
          );
          return JSON.stringify({
            glWidth: gl.width,
            glHeight: gl.height,
            glHidden: gl.hidden,
            c2dHidden: c2d.hidden,
            sysCols,
            sysNodes,
            sysEdges,
            mechEdgeBadges,
            stageEdgePills,
            propCards,
            selRows,
            angularRows,
            angularCols,
            estimabilityRows,
            fiveRows,
            exposureBoxes,
            strainBoxes,
            mpLayers,
            glmmRows,
            integrity,
            biophys,
            hasCoarseBadgeInMechList,
            ferritinVal: document.getElementById('kpiFerritin').textContent,
            chainTauVal: document.getElementById('kpiChainTau').textContent,
            larmorVal: document.getElementById('kpiCryFreq').textContent
          });
        })()`);
        assert.ok(state3d.glWidth > 400 && state3d.glHeight > 350, `Expected sized 3D canvas, got ${state3d.glWidth}x${state3d.glHeight}`);
        assert.strictEqual(state3d.glHidden, false);
        assert.strictEqual(state3d.c2dHidden, true);
        assert.strictEqual(state3d.sysCols, 3, 'Expected 3 system columns rendered');
        assert.strictEqual(state3d.sysNodes, 10, 'Expected 10 causal nodes across the 3 systems');
        assert.strictEqual(state3d.sysEdges, 9, 'Expected 9 per-edge evidence items across the 3 systems');
        assert.ok(state3d.mechEdgeBadges >= 16, `Expected >= 16 per-edge badges in mechanism list, got ${state3d.mechEdgeBadges}`);
        assert.ok(state3d.stageEdgePills >= 2, `Expected >= 2 per-edge pills in #stageEdgeLegend, got ${state3d.stageEdgePills}`);
        assert.strictEqual(state3d.hasCoarseBadgeInMechList, false, 'Prohibited coarse badge found in #mechList');
        assert.strictEqual(state3d.propCards, 4, 'Expected 4 Main Causal Gap proposition cards (P1-P4)');
        assert.strictEqual(state3d.selRows, 7, 'Expected 7 species rows in cpm-sp-v1 selection vs. displacement table');
        assert.strictEqual(state3d.angularRows, 4, 'Expected 4 candidate mechanism rows in Preregistered Angular Response Curve table');
        assert.strictEqual(state3d.angularCols, 5, 'Expected 5 columns in Preregistered Angular Response Curve table including 9-angle numerical values');
        assert.strictEqual(state3d.estimabilityRows, 4, 'Expected 4 rows in 15-cell vs. 24-cell Estimability & Aliasing table');
        assert.strictEqual(state3d.fiveRows, 5, 'Expected 5 rows in Revised Planned-Contrast Matrix');
        assert.strictEqual(state3d.exposureBoxes, 6, 'Expected 6 exposure & environmental control cards');
        assert.strictEqual(state3d.strainBoxes, 5, 'Expected 5 organism & genetic validation gate cards');
        assert.strictEqual(state3d.mpLayers, 4, 'Expected 4 Multiphysics & GLMM layer cards (Layers A-D)');
        assert.strictEqual(state3d.glmmRows, 5, 'Expected 5 GLMM endpoint model rows');
        assert.strictEqual(state3d.integrity.all_displacement_cis_span_zero, true);
        assert.strictEqual(state3d.integrity.all_survivor_radius_decompositions_exact, true);
        assert.strictEqual(state3d.integrity.has_matched_connectivity_control, true);
        assert.strictEqual(state3d.integrity.hazard_commitments, 5511);
        assert.strictEqual(state3d.integrity.planned_contrast_cells, 15);
        assert.strictEqual(state3d.integrity.full_crossed_factorial_cells, 24);
        assert.strictEqual(state3d.integrity.angular_curve_models, 4);
        assert.strictEqual(state3d.integrity.estimability_rows, 4);
        assert.strictEqual(state3d.integrity.strain_validation_gates, 5);
        assert.strictEqual(state3d.integrity.total_system_edges, 9);
        assert.ok(state3d.biophys.ratioFerritin < 1e-4, `Expected ratioFerritin < 1e-4, got ${state3d.biophys.ratioFerritin}`);
        assert.ok(Math.abs(state3d.biophys.ratioChain - 5.505127) < 1e-3, `Expected ratioChain ~ 5.505127 at 310 K, got ${state3d.biophys.ratioChain}`);
        assert.ok(Math.abs(state3d.biophys.fLarmor_MHz - 1.40) < 1e-2, `Expected fLarmor_MHz ~ 1.40, got ${state3d.biophys.fLarmor_MHz}`);
        assert.strictEqual(state3d.ferritinVal, '3.3e-5 k_B T');
        assert.strictEqual(state3d.chainTauVal, '5.51 k_B T');
        assert.strictEqual(state3d.larmorVal, '1.40 MHz');
        console.log(`PASS [2/4]: 3-D WebGL scene (${state3d.glWidth}x${state3d.glHeight}), per-edge evidence badges, 9-angle curve table, 15-vs-24 estimability table, exposure/strain controls, and 4-layer GLMM verified.`);

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
        console.log('PASS [3/4]: Biomagnetic Walk Null Explorer canvas & Revised 5-Row / 24-Cell Factorial Simulator (including 180 deg reversal within full angular curve) verified.');
      }
    );

    await withChromeSession(
      ['--disable-webgl', '--disable-webgl2'],
      port,
      baseDebugPort + 1,
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

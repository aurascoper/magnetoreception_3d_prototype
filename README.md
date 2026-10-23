# 3D Magnetoreception, Biomagnetic Walk Null Explorer & Multiphysics-GLMM Interface (Prototype v2.2)

Independent hypothesis-first prototype repository (`feat/magnetoreception-3d-interface`) developed separately from `aurascoper/oklo_shareable_portal` and `aurascoper/Biofilms` so that radiation-melanin redox responses, candidate geomagnetic sensing mechanisms, engineered magnetic nanoparticle actuation, multiphysics biofilm transport/rheology, and hierarchical statistical inference can be investigated with strict per-edge epistemic tags (`OBSERVED`, `OBSERVED_IN_VITRO`, `MODELED`, `HYPOTHESIZED`, `UNRESOLVED_TRANSDUCTION`, `CONTEXT-DEPENDENT / UNRESOLVED`, `ENGINEERED`, `REFUTED_THERMAL_BOUND`, `SYNTHETIC_COUNTEREXAMPLE`, `QUARANTINED`).

> **Epistemic & Software Verification Notice**: Neither the interactive 3D/2D interface nor the automated CI test suite validates biological magnetoreception or fungal radiotropism. `test_magnetoreception_interface.js` is an **interface and regression audit**, whereas `test_calculation_provenance_and_invariants.js` verifies **first-principles physical calculations, synthetic counterfactual invariants, and linear-model estimability ranks**. Any promotion of an edge from `MODELED`, `HYPOTHESIZED`, or `UNRESOLVED_TRANSDUCTION` to `OBSERVED` requires replicated wet-lab measurements passing Gates A-D.

---

## 1. Per-Edge Evidence Tagging Across Systems 1, 2, and 3 (Red-Team Finding 1)

Coarse whole-pathway labels (such as `"OBSERVED / MODELED / HYPOTHESIZED"` applied to an entire multi-step chain) are prohibited because they obscure where empirical support ends and unproven biological transduction begins. Every directed step is tagged individually in `evidence_manifest.json` and on every node, edge, and readout panel in `index.html`:

| System Edge ID | Directed Step (`from -> to`) | Evidence Tag | Verified Literature / Scope |
| --- | --- | --- | --- |
| **`E1_1` (System 1 / P1)** | `s1_melanin_esr_nadh -> s1_redox_intermediary`: Ionizing radiation + melanin (`OBSERVED_IN_VITRO`: `g ~ 2.004` ESR & `4x` NADH reduction) -> cytosolic redox mediator transfer | `HYPOTHESIZED` | Upstream ESR/NADH observed in vitro (`Dadachova et al. 2007`, `doi:10.1371/journal.pone.0000457`); intact cytosolic shuttling hypothesized |
| **`E1_2` (System 1 / P3)** | `s1_redox_intermediary -> s1_mitochondrial_etc`: Melanin-derived redox shift -> localized fungal mitochondrial ETC / bioenergetics | `UNRESOLVED_TRANSDUCTION` | Requires `t_mito < t_tip`, orthogonal `2-OH-E+` / `mito-roGFP2` readouts, and specific intervention + rescue (`Gassab et al. 2026`) |
| **`E1_3` (System 1 / P4)** | `s1_mitochondrial_etc -> s1_hyphal_tropism`: Mitochondrial asymmetry -> active directional hyphal-tip steering (`delta_r_i`, `theta_tip`) beyond differential survival (`H0-B`) | `CONTEXT-DEPENDENT / UNRESOLVED` | Historical isolates (`Zhdanova et al. 2004`) vs. `Sandia 2024 Cs-137 null`; confounded by `H0-B` selection (`cpm-sp-v1` synthetic counterexample) |
| **`E2_A` (System 2 / P1-P3)** | `s2_route_a_melanin_spin -> s1_mitochondrial_etc`: Hypothesized `50 uT` melanin semiquinone radical-pair spin shift -> fungal mitochondrial redox signaling | `UNRESOLVED_TRANSDUCTION` | Melanin ESR paramagnetism (`Dadachova et al. 2007`) does **not** establish a magnetic compass (`Lam & Malkemper 2026`) |
| **`E2_B1` (System 2 / P2)** | `photon_blue_excitation -> s2_route_b_flavin_superoxide`: `50 uT` Zeeman (`1.40 MHz`) + hyperfine -> `[FAD*- ... TrpH*+]` spin mixing in purified Cryptochrome 4 | `OBSERVED_IN_VITRO` | `Xu et al. 2021` (`Nature 594:535-540`); `Maeda et al. 2012` (`doi:10.1073/pnas.1118959109`); physiological coherence & signaling unresolved (`arXiv:2508.21350`) |
| **`E2_B2` (System 2 / P2-P3)** | `s2_route_b_flavin_superoxide -> s1_redox_intermediary`: Flavin-superoxide `[FAD*- ... O2*-]` spin-pair yield & planarian ROS amplification model | `MODELED` | `Rishabh, Zadeh-Haghighi & Simon 2023` (`arXiv:2312.06597`) is a computational planarian regeneration model with unresolved spin-relaxation/amplification assumptions, not fungal evidence |
| **`E2_C` (System 2 / P3-P4)** | `s2_route_c_magnetite -> s1_hyphal_tropism`: Biogenic `15x 25nm` `Fe3O4` chain torque (`U_mag / k_B T = 5.69` at `300 K`, `5.51` at `310 K` `MODELED`; bacterial alignment `OBSERVED`) -> fungal mechanosensitive tip steering | `UNRESOLVED_TRANSDUCTION` | `Kirschvink & Gould 1981`; eukaryotic tether and fungal biogenic magnetosome chains remain unresolved |
| **`E3_1` (System 3)** | `s3_synth_magnetomechanical -> s1_mitochondrial_etc`: Exogenous `35-100 nm` `Fe3O4` MNP torque (`>10 k_B T` at `5-50 mT`) -> `Piezo1/TRPV4` gating -> `Ca2+` influx | `ENGINEERED` | Synthetic millitesla actuation (`Gregurec et al. 2020`; `Lee et al. 2021`); does **not** validate endogenous `50 uT` geomagnetic sensing |
| **`E3_2` (System 3)** | `s3_ferritin_exclusion -> s1_mitochondrial_etc`: Endogenous `6 nm` ferritin core (`m ~ 300 mu_B` at `50 uT`) -> mechanical or thermal channel gating | `REFUTED_THERMAL_BOUND` | `U_mag / k_B T = 3.36e-5` at `300 K` (`3.3e-5` at `310 K`) `<< 1` (`Meister 2016`, `eLife 5:e17210`; fails thermal bound by `>4` orders of magnitude) |

---

## 2. Causal Inference: Scoping `cpm-sp-v1` as a Synthetic Counterexample & Primary Biological Endpoints (Red-Team Finding 2)

- **Synthetic Counterexample Scope (`SYNTHETIC_COUNTEREXAMPLE`)**: In `aurascoper/Biofilms` `cpm-sp-v1` (execution source `841d052`, configuration hash `eb090aa3c0a971776a6e262713eb0cf5c130b53cf2b8d7720ad93dec19f50b01`, Growth OFF, 256 seeds `42..297`, `N=40`, 6 parcels/species, MCS 100), axial dose-rate mortality removes `5,511` of `10,752` parcels in `survival_only` and `combined` (`0` in `baseline` and `phase_only`). For all 7 species, the surviving population's final radius shift `surv_r_diff` satisfies the exact counterfactual decomposition `surv_r_diff == init_surv_r_diff + disp_diff` (within `1e-6`), where `init_surv_r_diff` is the initial radius of those same surviving parcels at `t = 0` (`+0.0538 r/R [0.0327, 0.0740]` in *S. oneidensis*) and every identified-parcel displacement interval `disp_diff = delta_r_i = r_i(t_1) - r_i(t_0)` spans zero (`+0.0011` to `-0.0052 r/R`). **This `5,511 / 10,752` simulation result is strictly a synthetic counterexample under a prescribed mortality law proving that aggregate centroid shifts (`Delta r_pop > 0`) cannot distinguish active tropism (`H0-A`) from differential survival (`H0-B`). It is never cited as empirical evidence about real fungi.**
- **Primary Biological Endpoints (Culture/Plate Replicate Level)**:
  1. **Tracked Live-Imaging Hyphal-Tip Displacement (`delta_r_i`)**: Time-lapse tracking (`Delta t <= 5 min`) of individual identified hyphal tips `i` from `t_0` to `t_1`, nesting tips within independent biological culture plates (`N >= 6` plates per condition across `>= 3` batches).
  2. **Logged Tip/Cell Death or Loss Events (`S_i(t)`)**: Explicit per-tip censoring and survival logging (`propidium iodide` / `SYTOX Green` + lysis/arrest detection) so selective removal near the source (`H0-B`) is separated from active movement (`H0-A`).
  3. **Tracked Tip Orientation & Angular Drift (`theta_tip(t)`, `d(theta_tip)/dt`)**: Circular-linear mixed-effects estimation (`von Mises` / projected-normal GLMM) of turning rate toward or away from `grad I_gamma` and `B` (`theta_B`).

---

## 3. Mechanism Discrimination: Preregistered Full Angular Response Curves `Y(theta_B)` (Red-Team Finding 3)

A single `180 deg` field reversal (`+B -> -B`) does **not** universally separate magnetite-based sensing from radical-pair sensing because superparamagnetic / induced-moment clusters (`U ~ -1/2 (B . chi . B)`, torque `~ B^2 sin(2*theta_B)`) are also `180 deg`-periodic, and asymmetric biological transduction can distort simple symmetry assumptions. Instead, Gate B preregisters and compares the **full angular response curve `Y(theta_B)` across `0, 30, 45, 60, 90, 120, 135, 150, 180 deg`** (and `[0..330 deg]` for full-circle odd/even harmonic orthogonality) using Fourier harmonic decomposition (`Y(theta_B) = a_0 + a_1*cos(theta_B) + b_1*sin(theta_B) + a_2*cos(2*theta_B) + b_2*sin(2*theta_B)`):

| Candidate Model ID | Harmonic Basis (`f(theta_B)`) | `0 deg` | `30 deg` | `45 deg` | `60 deg` | `90 deg` | `120 deg` | `135 deg` | `150 deg` | `180 deg` | Parity (`+B -> -B`) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `M_C1_POLAR_MAGNETITE_TORQUE` | `cos(theta_B)` (`a_1 != 0, a_2 = 0`) | `+1.000` | `+0.866` | `+0.707` | `+0.500` | `0.000` | `-0.500` | `-0.707` | `-0.866` | `-1.000` | Odd (`Inverts`) |
| `M_B1_AXIAL_RADICAL_PAIR` | `cos(2*theta_B)` (`a_1 = 0, a_2 != 0`) | `+1.000` | `+0.500` | `0.000` | `-0.500` | `-1.000` | `-0.500` | `0.000` | `+0.500` | `+1.000` | Even (`Invariant`) |
| `M_B2_ANISOTROPIC_RADICAL_PAIR_MAPPED` | `0.7*cos(2*theta_B) - 0.3*sin(2*theta_B)` | `+0.700` | `+0.090` | `-0.300` | `-0.610` | `-0.700` | `-0.090` | `+0.300` | `+0.610` | `+0.700` | Even (`Phase-shifted`) |
| `M_C2_SUPERPARAMAGNETIC_INDUCED` | `sin(2*theta_B)` (`B^2`-quadratic, `b_2 != 0`) | `0.000` | `+0.866` | `+1.000` | `+0.866` | `0.000` | `-0.866` | `-1.000` | `-0.866` | `0.000` | Even (`180 deg periodic`) |

---

## 4. Pathway Inference: Orthogonal Mitochondrial Readouts & Causal Mediation Controls (Red-Team Finding 4)

- **Temporal Precedence (`t_mito < t_tip`) Is Necessary, Not Sufficient**: Observing `t_mito < t_tip` checks only temporal ordering; a shared upstream trigger can independently drive rapid mitochondrial depolarization and slower cytoskeletal reorganization without mitochondrial ROS causing tip steering.
- **MitoSOX Alone Is Non-Specific**: Hydroethidine / MitoSOX fluorescence is confounded by mitochondrial membrane potential (`Delta_Psi_m`), probe uptake, and non-superoxide two-electron oxidation products (`ethidium`).
- **Required Orthogonal Readouts**:
  1. `RO_1`: **HPLC / LC-MS quantification of superoxide-specific `2-hydroxyethidium (2-OH-E+)`** separated from non-specific ethidium (`E+`), normalized to cellular protein/biomass and probe uptake.
  2. `RO_2`: **Genetically encoded ratiometric `mito-roGFP2-Orp1` (`H2O2`) and `mito-Grx1-roGFP2` (`E_GSH`)** calibrated against `100%` oxidized (`diamide`) and `100%` reduced (`DTT`) bounds (`405/488 nm` ratio).
  3. `RO_3`: **Concurrent `Delta_Psi_m` monitoring (`TMRM` in non-quenching mode <= 20 nM)** to control for Nernstian dye-accumulation artifacts.
- **Required Causal Intervention Controls**: Vehicle control (`<= 0.1% DMSO`), triphenylphosphonium carrier control (`decyl-TPP+` vs. `MitoTEMPO`), basal growth-rate & tip-extension parity check (`within +/- 10%` of vehicle in Row 1), membrane-integrity check (`PI / SYTOX Green`), washout/rescue reversibility, and genetic epistasis (`sod2Delta` or conditional `AOX1`).

---

## 5. Experimental Design: 15-Cell Planned-Contrast Subset vs. Full 24-Cell (`2x4x3`) Crossed Factorial (Red-Team Finding 5)

When `Radiation x Magnetic Field` (`beta_RB`) or `Radiation x Magnetic Field x Melanin Genotype` (`beta_RBM`) interactions are primary targets, the **full 24-cell (`2 Radiation states x 4 Magnetic-field states x 3 Genotypes`) crossed factorial is recommended**. The 15-cell planned-contrast subset (Rows 1-5) omits the 9 sham-radiation field-manipulation cells (`Row 1B: 0 Gy + +90 deg`, `Row 1C: 0 Gy + 180 deg`, `Row 1D: 0 Gy + <0.1 uT`), reducing the design-matrix rank from `24` to `15`:

| Target Contrast / Parameter | 15-Cell Subset (`Rows 1-5`) | Aliasing Formula in 15-Cell Subset | Full 24-Cell Crossed (`2x4x3`) |
| --- | --- | --- | --- |
| `C1_RAD_GENOTYPE_AT_50UT` (`beta_R`, `beta_M`, `beta_RM` at `50 uT`) | **ESTIMABLE** | Unaliased (`Rows 1 & 2` fully crossed at `50 uT`) | **ESTIMABLE** |
| `C2_CONDITIONAL_B_WITHIN_RAD` (`B` contrasts within `+grad I_gamma`) | **ESTIMABLE (Conditional Only)** | Estimates `beta_B + beta_RB` and `beta_BM + beta_RBM` within `R = 1` | **ESTIMABLE** |
| `C3_MAIN_EFFECT_B_AT_SHAM_RAD` (`beta_B`, `beta_BM` at `0 Gy`) | **ALIASED / UNIDENTIFIABLE** | Missing `Rows 1B, 1C, 1D`; `E[Y|R=1,B_k] - E[Y|R=1,B_0] = beta_{B,k} + beta_{RB,k}` | **ESTIMABLE** |
| `C4_INTERACTION_RB_AND_RBM` (`beta_RB`, `beta_RBM` across `B` states) | **ALIASED / UNIDENTIFIABLE** | `beta_{RB,k}` and `beta_{RBM,k,m}` are 100% confounded with `beta_{B,k}` and `beta_{BM,k,m}` (`rank = 15 < 24`) | **ESTIMABLE** |

---

## 6. Exposure & Environmental Control Specification (Red-Team Finding 6)

Preregistered hardware tolerances and blinded automatic run-exclusion rules enforced before unblinding:
1. **3-Axis Sample-Plane Field Map (`>= 9-point` grid)**: Calibrated 3-axis fluxgate (`Bartington Mag-03` or equivalent, `<= 10 nT` resolution) across center, 4 cardinal radii, and 4 diagonals before and after each run.
2. **Field Magnitude & Spatial Uniformity**: `50.0 +/- 0.5 uT` (`<= 1.0%` spatial inhomogeneity across the sample zone); zero-field suppression `< 0.1 uT` (`< 100 nT`) across all 3 axes.
3. **Spatial Gradient Limit**: `|grad B| <= 0.5 uT/cm` in uniform-field cells (Rows 1-4) to prevent unintended magnetophoretic gradients.
4. **Bifilar Active-Cancel Sham Coils**: Matched `I^2 * R` ohmic dissipation in parallel vs. anti-parallel modes (`|P_active - P_sham| / P_active <= 1.0%`) at `1 Hz` telemetry.
5. **Temperature & Vibration Limits**: Differential sample-plane temperature `|Delta T| <= 0.05 C` (absolute `+/- 0.10 C`); 3-axis accelerometer floor `<= 1.0e-4 g RMS` (`1-200 Hz`).
6. **Source-to-Sample Radiation Dose & Spectrum Map**: Calibrated TLD/OSLD + Monte Carlo (`Geant4`/`MCNP`) map (`+/- 3.0%` dose-rate uncertainty) with non-magnetic collimator verification.
7. **Blinded Automatic Run-Exclusion Rules**: Any run violating field uniformity (`> 1.0%`), sham-coil power parity (`> 1.0%`), differential temperature (`|Delta T| > 0.05 C`), vibration (`> 1e-4 g RMS`), or incubator door opening is automatically flagged and excluded prior to unblinding.

---

## 7. Phase-Locking Caveat & Matched-Connectivity / Fixed-Lineage Control (Red-Team Finding 7)

The contrast between `15 of 16` seeds phase-locked in `cpm-sp-growth-v1` (Growth ON, `R(200) = 0.994`) and `0 of 256` seeds in `cpm-sp-v1` (Growth OFF, `R(100) = 0.411`) is a **synthetic negative lesson (`SYNTHETIC_NEGATIVE_LESSON`)** about how contact-graph percolation (`~11.3` components -> `1` component) and lineage inheritance confound synchronization metrics. Four controls are enforced:
1. **Control 1**: Uncoupled `K = 0` Replay on the exact recorded growth trajectory (`15/16 -> 0/16` locked).
2. **Control 2**: Phase-Randomized & Cross-Seed Surrogate (`1,000` permutations).
3. **Control 3**: Independent-Oscillator + Lineage-Inheritance Null for any wet-lab reporter claim.
4. **Control 4 (New - Red-Team Finding 7)**: **Matched-Connectivity (`<k>`, `lambda_2(L)`, single component) & Fixed-Lineage Graph Control** holding contact topology and division tree identical between Growth-ON and Growth-OFF surrogates so coupling `K` is isolated from graph percolation.

---

## 8. Organism-Specific Strain & Genetic Validation Gates (`GEN_1` to `GEN_5`, Red-Team Finding 9)

Deleting `PKS1` or `LAC1` cannot be treated as a clean "melanin switch" without passing 5 organism-specific validation gates prior to factorial attribution:
- **`GEN_1` (Genomic Verification & Single-Copy Complementation)**: Whole-genome sequencing or Southern/junction PCR confirming clean `pks1Delta` / `lac1Delta` deletion without off-target aneuploidy, paired with a single-copy complemented rescue strain (`pks1Delta::PKS1` or `lac1Delta::LAC1`).
- **`GEN_2` (Melanin & Paramagnetic Center Verification)**: Quantitative room-temperature X-band ESR (`g ~ 2.004` spin density per mg dry weight), optical absorption, and acid-resistant melanin ghost yield (`WT`, `Albino`, and `Complemented Rescue >= 85%` of WT).
- **`GEN_3` (Baseline Growth, Hyphal Morphology & Cell-Wall Parity in Row 1)**: Radial extension rate, branching frequency, germination (`>= 95%`), and cell-wall stress sensitivity (`Calcofluor White`, `Congo Red`, `SDS`) in sham Row 1 (`0 Gy, 50 uT`) within `+/- 10%` of WT.
- **`GEN_4` (Baseline Oxidative-Stress & Redox Phenotyping)**: Baseline susceptibility to exogenous `H2O2` and `menadione` plus basal `mito-roGFP2` redox state measured prior to radiation exposure so pleiotropic antioxidant defects are not misattributed to radiation-melanin electron transfer.
- **`GEN_5` (Institutional Biosafety & Regulatory Review)**: BSL-1 / BSL-2 containment and radiation-safety approval for the specific fungal species (`Cryptococcus neoformans`, `Wangiella dermatitidis`, or `Cladosporium sphaerospermum`).

---

## 9. Staged Multiphysics & GLMM Roadmap (`Layers A-D`, Red-Team Finding 10)

The 4-layer architecture (`Layers A, B, C, D`) is a **staged candidate roadmap**, not a single monolithic fit:
- **Stage 1 (Default Active for Gates A-C)**: **Layer D Hierarchical GLMM on Survival (`S_i`), Growth (`mu_i`), and Tracked Tip Directionality (`delta_r_i`, `theta_tip`)** under the null `theta_i = 0, gamma_i = 0` (`Layer C` inactivated), with **Layer A (`u = 0` static agar)** and **Layer B (rheology inactive)** turned OFF.
- **Stage 2 (Conditional Flow Activation)**: Activate **Layer A (Darcy-Brinkman-Stokes)** *only* if experiments use perfused microfluidic chambers (`Pe > 0.1`) with measured velocity fields (`PIV`).
- **Stage 3 (Conditional Rheology Activation)**: Activate **Layer B (Oldroyd-B Viscoelasticity)** *only* when independent oscillatory shear rheometry (`G'`, `G''`) is collected; never fit rheological parameters from colony morphology images.
- **Stage 4 (Conditional Pathway Coupling)**: Activate **Layer C (`theta_i != 0` or `gamma_i != 0`)** *only* after a mechanism clears Gates A-C and holds out-of-sample predictive skill (`Delta AIC < -10` and cross-validated log-score improvement over `theta_i = 0, gamma_i = 0`).

---

## 10. Cross-Domain Epistemic Gates (`EG-1`..`EG-4`), 3-Regime Biotite Inclusion Qualification, 3-Tier Irradiation-vs-Magnetoreception Hierarchy & Specimen-Encoding Gate

1. **Four Cross-Domain Epistemic Gates (`EG-1` to `EG-4`)**:
   - **`EG-1` (Geochemical Provenance - `OBSERVED_GEOLOGY_AND_UNVERIFIED_BIOTITE_LINK`)**: Published descriptions of the Paleoproterozoic (`~1.95 Ga`) Oklo reactor zones document uraninite, liquid/solid bitumen, and hydrothermal **illite** and **chlorite** (`Nagy et al. 1991, 1993`; `Gauthier-Lafaye et al. 1996`). **Biotite is not verified as an Oklo reactor-zone mineral** (`oklo_reactor_zone_biotite_verified = false`) and is evaluated strictly as an independent comparative `2:1` phyllosilicate specimen and prebiotic-scaffold hypothesis (`Hansma 2022`).
   - **`EG-2` (Physical Mechanism - `MODELED`)**: At `B = 50 uT` and `T = 300 K`, a modeled `15`-crystal single-domain magnetite (`Fe3O4`, `r = 25 nm`) chain has `U_mag / (k_B T) = 5.6886` (`[0.4096, 26.0160]` across `N in {5, 15, 25}, r in {15, 25, 35} nm`), whereas a volume-matched inclusion-free paramagnetic biotite grain (`Delta_chi = 2.5e-4 SI`, `M_r = 0`) has `U_mag,aniso / (k_B T) = 5.8943e-8` (`[4.7155e-9, 3.5366e-7]` across `Delta_chi in [2.0e-5, 1.5e-3] SI`). For a `1 um^3` natural biotite flake with `Fe3O4` inclusions (`0%`, `0.01%`, `1%`), three magnetic-state regimes are separated (`Dunlop & Ozdemir 1997`, all with `is_realistic_natural_default = false` until rock-magnetic characterization is performed):
     - **Scenario A (`idealized_saturated_coherently_blocked_upper_bound`)**: Coherently aligned single-domain `Fe3O4` at full saturation `M_s = 4.8e5 A/m` (requires prior `~0.3-1 T` saturating field `>> 50 uT`) -> `6.0040e-5` (`0%`), `0.5795` (`0.01%`), `57.9438` (`1%`).
     - **Scenario B (`partially_remanent_natural_nrm_blocked_regime`)**: Blocked inclusions with natural remanence `M_NRM = 0.01 * M_s` -> `6.0040e-5` (`0%`), `5.8544e-3 << 1` (`0.01%`), `0.5795 < 1` (`1%`).
     - **Scenario C (`unblocked_superparamagnetic_or_low_field_induced_regime`)**: Unblocked superparamagnetic (`r < 10-15 nm`, `M_r = 0`) or demagnetized multi-domain inclusions (`Delta_chi_eff = 0.5 SI` anisotropic; `chi_eff = 3.0 SI` isotropic, quadratic in `B`) -> `7.2041e-5` to `1.2602e-3` (anisotropic, torque-generating) and `1.3208e-4` to `7.2642e-3` (isotropic, zero uniform-field torque `dU/dtheta = 0`).
   - **`EG-3` (Cellular Transduction - `UNRESOLVED_TRANSDUCTION`)**: Downstream coupling from radical-pair yields, melanin redox shifts, or magnetic particles to eukaryotic signaling and active directional growth (`H0-A` vs `H0-B`) remains unresolved (`Gassab et al. 2026`; `Lam & Malkemper 2026`).
   - **`EG-4` (Evolutionary Origin - `UNTESTED_EVOLUTIONARY_HYPOTHESIS`)**: No phylogenetic, fossil, or geochemical evidence links `~1.95 Ga` Oklo reactor zones or prebiotic biotite surfaces to magnetosome (`mam/mms`) or cryptochrome evolution.
2. **Three-Tier Irradiation-vs-Magnetoreception Evidential Hierarchy**:
   - **Tier 1 (`DIRECTLY_SUPPORTED` - Inorganic Material Damage & Magnetic Property Shifts)**: Neutrons displace atoms, producing vacancies, interstitials, defect clusters, dislocation loops, and cavities. In ferromagnetic steels and alloys, these defects impede magnetic-domain-wall motion and alter measured Barkhausen noise, initial permeability, coercivity, and remanence with material- and condition-dependent sign and magnitude (`Park et al. 2004`, `doi:10.4028/www.scientific.net/KEM.270-273.657`: coercivity `+16%` with lower Barkhausen noise and permeability in irradiated A508 RPV steel; `Shong et al. ASTM STP15114S`, `doi:10.1520/STP15114S`: coercivity and remanence predominantly decreased in irradiated Fe and Ni wires).
   - **Tier 2 (`ANALOGY_ONLY_OPPOSITE_EXPLANATORY_DIRECTION` - Shared Physical Ingredients vs. Opposite Explanatory Direction)**: Both irradiation physics and magnetoreception involve magnetic moments, electron spins, anisotropy, and thermal scales, but the explanatory direction is opposite: materials irradiation studies how radiation damage changes a sample, whereas a biological magnetoreceptor must detect an external field and transduce it into a functional signal.
   - **Tier 3 (`SEPARATE_BIOLOGICAL_HYPOTHESIS` - Radiotropism & Biological Magnetoreception)**: Radiation effects on redox chemistry, growth, or survival (`H0-B`) do not establish directional radiotropism (`H0-A`), and biological magnetoreception requires reproducible, sham-controlled, field-dependent organism-specific evidence.
3. **Specimen-Encoding & Modality Gate (`Does the image show defect/phase evolution or cellular morphology, or is it explicitly a magnetic characterization?`)**:
   - Before connecting any micrograph or simulation rendering to mineral magnetism or magnetoreception, caption/metadata must establish: (a) material identity and irradiation conditions, (b) imaging/simulation modality (e.g. BF/Fresnel TEM, in-situ tensile TEM with Gatan 672 holder, DIC live-cell microscopy, phase-field simulation, or Lorentz TEM / holography), and (c) what visual channels, colours, or annotations encode:
   - **Colour-Channel Decision Branches (`colour_channel_decision_branches`, e.g. Purple & Green Regions)**:
     - **Branch A (`phases_precipitates_defects_or_rendering_categories`)**: If `purple` and `green` regions represent chemical phases, precipitates, defects, particles, or rendering categories in an irradiated alloy -> `MATERIALS_SCIENCE_MICROSTRUCTURE_PROBLEM` (`relevant_to_mineral_magnetism_eg2 = false`, `establishes_biological_sensing_eg3 = false`).
     - **Branch B (`magnetic_domains_or_measured_magnetic_inclusions`)**: If `purple` and `green` regions explicitly represent measured magnetic domains or magnetic inclusions -> `MINERAL_AND_MAGNETITE_PHYSICS_CONSTRAINT_ONLY` (`relevant_to_mineral_magnetism_eg2 = true`, `establishes_biological_sensing_eg3 = false`).
   - **Methods & Physical Constraints Bridge (`methods_and_physical_constraints_bridge`)**: Irradiation materials work serves strictly as a source of methods and physical constraints for reasoning about which magnetic signatures are physically plausible in inorganic materials under radiation-induced defect, magnetic-domain, and phase evolution vs. which claims require independent biological evidence (`is_evidence_for_radiotropism = false`, `is_evidence_for_biological_magnetoreception = false`).

| Reference Specimen & Visualization | Imaging / Preparation Modality | What Visual Channels & Annotations Encode | Assigned Epistemic Tier & Verdict |
| --- | --- | --- | --- |
| **In-Situ Tensile + BF/Fresnel TEM of Irradiated Alloy** | SEM/FIB micro-tensile gauge (`~190 nm` foil on `Gatan 672` holder) + BF-TEM (`100 nm`) and underfocus/overfocus Fresnel-contrast TEM (`50 nm`) | Mechanical `Loading direction` (blue arrows), **dislocation loops** (red arrows), and nanoscale **cavities**/voids (red circles); **NOT** magnetic domains and **NOT** biological cells | `TIER_1_INORGANIC_IRRADIATION_MICROSTRUCTURE` (`establishes_magnetoreception_or_radiotropism = false`) |
| **Magnetotactic Bacterium TEM & Magnetosome Schematic** | Whole-cell TEM (`0.5 um`), isolated magnetosome TEM (`50 nm`), and organelle molecular schematic | Intracellular single-domain `Fe3O4` **Magnetosome chain**, lipid-bilayer **Magnetosome membrane** (blue arrows), and **Magnetosome membrane proteins** (`Mam/Mms`) | `PROKARYOTIC_BIOGENIC_MAGNETORECEPTION_REFERENCE` (`establishes_fungal_radiotropism = false`) |
| **Fungal Hyphal Tip Live-Cell DIC Time-Lapse (`0-15 s`)** | Live-cell differential interference contrast (DIC) optical time-lapse (`0 s, 5 s, 10 s, 15 s`) | Apical cytoplasm (`Cyt`), vacuole (`Vac`), and 15 s intracellular vesicle/organelle dynamics (arrowheads/dashed ellipses); **NOT** magnetic domains or sham-controlled field tropism | `TIER_3_CELLULAR_MORPHOLOGY_BASELINE_ONLY` (`establishes_magnetoreception_or_radiotropism = false`) |

---

## 11. Running the Separated Verification Suites (Red-Team Finding 8)

```bash
# 1. Scientific Calculation Provenance, Trajectory Counterfactuals & Design-Matrix Rank Suite
node test_calculation_provenance_and_invariants.js

# 2. Headless Chrome WebGL / 2D Fallback & DOM Interface Regression Audit
node test_magnetoreception_interface.js
```


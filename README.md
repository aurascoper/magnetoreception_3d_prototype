# 3D Magnetoreception, Melanin-Redox-Mitochondrial & Magnetogenetics Research Interface (Prototype v2)

Independent hypothesis-first prototype repository (`feat/magnetoreception-3d-interface`) developed separately from `aurascoper/oklo_shareable_portal` and `aurascoper/Biofilms` so that radiation-melanin redox responses, candidate geomagnetic sensing mechanisms, engineered magnetic nanoparticle actuation, and downstream mitochondrial signaling can be investigated with explicit epistemic tags (`OBSERVED`, `MODELED`, `HYPOTHESIZED`, `ENGINEERED`, `CONTEXT-DEPENDENT`, `QUARANTINED`).

## Core Epistemic Principle: Separating Energy vs. Information Channels

- **Radiation Dose Gradient (`grad I_gamma`)**: Acts as a candidate **energy / radiolytic redox input channel** (altering melanin ESR signals and driving 4x NADH reduction in vitro; Dadachova et al. 2007).
- **Magnetic Flux Density Vector (`B`, `25 to 65 uT` geomagnetic or `5 to 250 mT` engineered)**: Acts as a **directional spin-chemistry or mechanical torque information channel**.
- **Inference Gate**: A colony plate image or metabolic assay alone does not establish that radiation or magnetic fields caused directional growth (`radiotropism` / `magnetotropism`). In `aurascoper/Biofilms` (`diagnostics/melanin_ensemble/radial_n40_p6_seeds42-297.csv`), the 256-seed, 4-arm ensemble (`full`, `no_rad`, `no_mel`, `null`) is a formal model-level null within `+/-0.05 r/R`, and Sandia National Laboratories (2024) reported no statistically significant difference in Cs-137 fungal growth experiments. Therefore, this interface visualizes the coupled Melanin-Redox-Mitochondrial-Magnetic model as a **testable research hypothesis** resolved through a 4-stage factorial experiment sequence (`Experiments A -> B -> C -> D`).

## Three-System Causal Architecture

1. **System 1: Biological Response to Radiation (`Melanin -> Redox/ROS -> Mitochondria -> Growth`)**
   - `OBSERVED`: Ionizing radiation alters melanin ESR paramagnetism and increases NADH ferricyanide reduction ~4x in vitro (Dadachova et al. 2007 *PLoS ONE* `doi:10.1371/journal.pone.0000457`; Robertson et al. 2012 *W. dermatitidis* transcriptomics).
   - `HYPOTHESIZED`: Melanin electron transfer into cytosolic redox / superoxide (`O2*-`) / peroxide (`H2O2`) pools and subsequent modulation of mitochondrial ETC (Complexes I-IV) and ATP synthesis.
   - `CONTEXT-DEPENDENT`: Polarized hyphal tip directional growth (classic Chernobyl isolate reports vs. Sandia 2024 Cs-137 experimental null and `aurascoper/Biofilms` 256-seed 4-arm model null).

2. **System 2: Candidate Magnetic Sensing Mechanism (`Spin-Chemistry Routes A & B vs. Magnetite Torque Route C`)**
   - **Route A (`HYPOTHESIZED`)**: Melanin paramagnetic semiquinone centers (`g ~ 2.004`) interacting with weak magnetic fields (`B`) during radical recombination or electron transfer.
   - **Route B (`MODELED` / `OBSERVED IN VITRO` for Cry4a)**: Cryptochrome flavin-tryptophan (`[FAD*- ... TrpH*+]`, Xu et al. 2021 *Nature*) and tightly bound flavin-superoxide (`[FAD*- ... O2*-]`, 2024 *Nature Communications*; planarian superoxide ROS preprint `arXiv:2312.06597`; Lam & Malkemper 2026 *Physiol. Rev.* `doi:10.1152/physrev.00032.2025`), linking geomagnetic singlet-triplet spin mixing directly to cellular ROS/superoxide signaling.
   - **Route C (`MODELED` / `OBSERVED IN BACTERIA`)**: Biogenic single-domain `Fe3O4` crystal chains (`tau = N * M_s * V * B * sin(theta) > k_B * T`).

3. **System 3: Engineered Magnetic Nanoparticle Interface (`Synthetic MNP Actuation vs. Ferritin Bound`)**
   - `ENGINEERED`: Exogenous synthetic `Fe3O4` nanodiscs/m-Torquers (`35 to 100 nm`, `5 to 50 mT`, gating `Piezo1`/`TRPV4`) and RF magnetothermal clusters (`100 to 500 kHz`, gating `TRPV1 -> Ca2+ -> Mitochondrial MCU`), kept strictly separate from natural fungal sensing claims.
   - `MODELED EXCLUSION`: Endogenous ferritin (`6 nm` ferrihydrite core, `~300 mu_B`) fails `k_B * T` thermal bounds by `>4` orders of magnitude (Meister 2016 *eLife*).
   - `QUARANTINED`: The unvalidated September 2026 bioRxiv `71 THz` (`4.22 um` mid-IR) mitochondrial light-matter preprint is quarantined outside the default mechanism model.

## Interactive Factorial Experiment Decision Sequence (`Experiments A -> B -> C -> D`)

- **Experiment A (`Radiation x Melanin Genetics`)**: `WT Melanized` vs. `Albino Mutant (pks1Delta/lac1Delta)` vs. `Complemented Rescue` under `+/- Ionizing Radiation` at fixed geomagnetic field (`50 uT`).
- **Experiment B (`Magnetic Field Rotation & Zeroing at Fixed Radiation Geometry`)**: Keeps radiation source geometry (`grad I_gamma`) fixed while switching `B` between `Ambient 50 uT`, `Zeroed <0.1 uT (Mu-Metal/Helmholtz)`, and `+90 deg Rotated B Vector`.
- **Experiment C (`Melanin x Magnetic Field Coupling`)**: Tests `WT Melanized` vs. `Albino Mutant` across magnetic field states to discriminate **Route A** (melanin-dependent radical spin response) from **Route B** (melanin-independent cryptochrome/flavin-superoxide response).
- **Experiment D (`Mitochondrial & ROS Temporal Ordering Gate`)**: Tracks whether mitochondrial superoxide (`MitoSOX`) and `NAD(P)H` shifts occur **prior to** (`t_mito < t_tip`) hyphal tip curvature and whether radical scavengers (`MitoTEMPO`) abolish the directional/metabolic response.

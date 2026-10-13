# 0006-preload-layers-and-image-budget

Date: 2026-10-13

Decision: Preload tools in three layers. Layer 1 has a 500 MB limit. Layer 1 plus Layer 2 has a 1.5 GB limit. Layer 3 bundles install on first need.

Reason: Users need common agent and startup tools at sign-in. One image with every tool breaks the first-run time and the weak-laptop test. Layers keep the first task fast and keep rare tools out of the core image.

This record changes the single 500 MB image budget in `docs/tech-stack.md`. It does not change the one-image rule in `docs/decisions/0002-runtime-one-image.md`. The layers form one tested image set.

Status: accepted for the first build. Change this record only with a new record that names this one.

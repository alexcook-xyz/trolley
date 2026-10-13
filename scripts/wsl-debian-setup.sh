#!/usr/bin/env bash
# WSL2 Debian starter for Proof B. Run each step once. Keep each sentence short.
set -u
set -e

# 1. Install the Debian distro as its own WSL2 image.
wsl --install -d Debian --no-launch

# 2. Boot the Debian distro and add core tools.
wsl -d Debian -u root -e bash -lc '
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq nodejs git bubblewrap curl ca-certificates
'

# 3. Check that the core tools exist.
wsl -d Debian -u root -e bash -lc 'node --version; git --version; bwrap --version'

# 4. Run one task in a sandbox. Host drives and the network stay hidden.
wsl -d Debian -u root -e bash /mnt/c/Users/alx93781/trolley/proof-b.sh
# The bwrap line in proof-b.sh is:
# bwrap --ro-bind /usr /usr --ro-bind /lib /lib --ro-bind /lib64 /lib64 \
#   --ro-bind /bin /bin --ro-bind /etc /etc --proc /proc --dev /dev \
#   --tmpfs /tmp --tmpfs /mnt --bind /work/trolley-proof-b /work/trolley-proof-b \
#   --chdir /work/trolley-proof-b --unshare-net --unshare-pid --die-with-parent \
#   node session.test.mjs

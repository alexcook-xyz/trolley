# Proof B record

Date: 2026-10-13. Host: this Windows machine.

## Result

Pass on Windows with WSL2. The macOS libkrun run stays open. No Mac is on hand in this session.

| Check | Result |
|---|---|
| Debian image boots under WSL2 | Pass. `wsl --install -d Debian` installed a version 2 distro. It boots as root with no manual tool fix. |
| Core tools install in the image | Pass. One `apt-get` run added Node.js, Git, bubblewrap, curl, and CA certificates. |
| Sandbox task runs | Pass. Node ran the session test inside bubblewrap and printed `PASS session test (sandbox)`. |
| Network is off in the sandbox | Pass. A curl test inside the sandbox returned code 000 and the blocked path. |
| Host drives are hidden | Pass. `/mnt/c` does not exist inside the sandbox. |
| Root file system is read-only | Pass. A write test to `/usr` failed with a read-only error. |
| Same image under libkrun on macOS | Open. Test this when a Mac is available. |

## Versions

| Item | Version |
|---|---|
| Image base | Debian GNU/Linux 13 (trixie) |
| Kernel | 6.18.54.1-microsoft-standard-WSL2 |
| Node.js | v20.19.2 |
| Git | 2.47.3 |
| bubblewrap | 0.12.0 |
| WSL distro version | 2 |

## Notes

This proof used the WSL2 Debian distro as the image test bed. The real build ships the same Debian base as a signed OCI image and imports it as a WSL2 distro. The sandbox flags in this run match the threat model: read-only system paths, a writable task folder only, no network, and no host drives.

## Next step

Re-run the Codex task after the 6:12 PM quota reset from the Proof A record. Then repeat this sandbox run under libkrun on a Mac. Start the full build only when both items pass.

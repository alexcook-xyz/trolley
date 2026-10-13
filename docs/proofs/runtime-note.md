# Runtime note

Proof B used the same Debian image that the product will ship. One WSL2 distro holds the image. Each task gets its own sandbox inside that distro.

| Check | Result |
|---|---|
| WSL2 | Present with default version 2 |
| Base | Debian GNU/Linux 13 (trixie) |
| Kernel | 6.18.54.1-microsoft-standard-WSL2 |
| Node.js | v20.19.2 |
| Git | 2.47.3 |
| bubblewrap | 0.12.0 |
| Sandbox test | PASS session test (sandbox) |
| Host drives | Hidden. `/mnt/c` does not exist inside the sandbox. |
| Network | Blocked. The sandbox has no network. |
| Root file system | Read-only. A write test fails. |

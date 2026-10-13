use std::process::Command;

#[cfg(windows)]
fn host_command() -> Command {
    let mut cmd = Command::new("wsl");
    cmd.args(["--list", "--verbose"]);
    cmd
}

#[cfg(not(windows))]
fn host_command() -> Command {
    let mut cmd = Command::new("uname");
    cmd.arg("-a");
    cmd
}

#[tauri::command]
pub fn vm_status() -> String {
    match host_command().output() {
        Ok(out) => {
            let text = if out.status.success() { out.stdout } else { out.stderr };
            // `wsl` on Windows emits UTF-16LE; strip NULs to get readable text.
            String::from_utf8_lossy(&text).replace('\0', "").trim().to_string()
        }
        Err(e) => e.to_string(),
    }
}

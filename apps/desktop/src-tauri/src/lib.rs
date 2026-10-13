mod vm_status;

#[tauri::command]
fn ping() -> &'static str {
    "pong"
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ping, vm_status::vm_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

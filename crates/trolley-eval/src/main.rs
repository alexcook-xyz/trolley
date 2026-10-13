use std::path::Path;

fn main() {
    let dir = std::env::args().nth(1).unwrap_or_else(|| "evals".to_string());
    let count = std::fs::read_dir(Path::new(&dir))
        .map(|entries| entries.filter_map(|e| e.ok()).filter(|e| e.path().extension().is_some_and(|x| x == "toml")).count())
        .unwrap_or(0);
    println!("trolley-eval 0.1.0: {count} eval task files in {dir}. Runner not built yet.");
}

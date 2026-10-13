import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export function App() {
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    invoke<string>("ping")
      .then(setStatus)
      .catch(() => setStatus("browser preview: no Tauri shell"));
  }, []);

  return (
    <main>
      <h1>Trolley</h1>
      <p>Shell status: {status}</p>
      <p>Describe a change, ask a question, or choose an issue.</p>
    </main>
  );
}

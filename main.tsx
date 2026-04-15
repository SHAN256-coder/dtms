import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ensureAnonymousAuth } from "./lib/firebase";

// Kick off anonymous Firebase auth so Firestore/Storage rules that require auth still work
ensureAnonymousAuth().catch(() => {
  // Non-fatal: form submission will surface any auth errors to the user
});

createRoot(document.getElementById("root")!).render(<App />);

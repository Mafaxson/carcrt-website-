import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (replace with real auth in production)
    if (password === "admin123") {
      setLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleLogin} style={{ background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 2px 8px #0001" }}>
          <h2 style={{ marginBottom: 16 }}>Simple Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: 8, width: 200, marginBottom: 16, display: "block" }}
            required
          />
          <button type="submit" style={{ padding: 8, width: 200 }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 2px 8px #0001" }}>
        <h2>Welcome, Admin!</h2>
        <p>This is your new, simple admin page.</p>
        {/* Add your admin controls here */}
      </div>
    </div>
  );
}

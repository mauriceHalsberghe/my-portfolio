"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password");
    }
  }

  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: 300 }}>
        <h1>Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin} style={{ padding: "0.5rem", cursor: "pointer" }}>
          Login
        </button>
      </div>
    </main>
  );
}
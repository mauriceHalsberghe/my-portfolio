"use client";
import { useState } from "react";
import Link from "next/link";

import AdminStyling from "../admin.module.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    if (!password || loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError("Wrong password");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={AdminStyling.loginPage}>
      <Link className={AdminStyling.backLink} href="/">
        ← Back
      </Link>
      <main className={AdminStyling.loginCard}>
        <h1 className={AdminStyling.title}>Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={AdminStyling.input}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          autoFocus
        />
        <button onClick={handleLogin} className={AdminStyling.button} disabled={loading}>
          {loading ? "Logging in…" : "Login"}
        </button>
        {error && <p className={AdminStyling.error}>{error}</p>}
      </main>
    </div>
  );
}

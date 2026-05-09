"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminStyling from "../admin.module.css";
import Link from "next/link";

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
    <main className={AdminStyling.login}>
      <Link className={AdminStyling.back} href={'/'}>Back</Link>
      <h1 className={AdminStyling.title}>Admin Login</h1>
      <input
        type="password"
        placeholder="Password"
        value={password}
        className={AdminStyling.input}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />
      <button onClick={handleLogin} className={AdminStyling.button}>
        Login
      </button>
      {error && <p className={AdminStyling.error}>{error}</p>}
    </main>
  );
}
import * as React from "react";
import { useRef, useState } from "react";
import { useAuth } from "../firebase/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate("/lobby");
      } catch {
        setLoading(false);
        setError("Failed to create an account");
      }
    } else {
      setError("Email and password are required.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "0 15px 15px 15px",
        height: "100%",
        gap: "20px",
      }}
    >
      <button onClick={() => navigate("/")}>Back</button>
      <strong>Sign Up</strong>

      {error && (
        <div style={{ color: "red", marginBottom: "1em" }}>{error}</div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div id="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div id="password">
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              style={{ marginTop: "1em" }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

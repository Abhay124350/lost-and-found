import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f4f0",
    fontFamily: "'DM Sans', sans-serif",
    padding: "1rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)",
  },
  logoWrap: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "#1D9E75",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "26px",
    fontWeight: 400,
    color: "#1a1a1a",
    margin: "0 0 6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 2rem",
    lineHeight: 1.5,
  },
  fieldWrap: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#999",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 14px",
    border: "1px solid #e2e2de",
    borderRadius: "10px",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a1a",
    background: "#fafaf8",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "0.75rem",
    borderRadius: "10px",
    border: "none",
    background: "#1D9E75",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "14px",
    color: "#888",
  },
  link: {
    color: "#1D9E75",
    textDecoration: "none",
    fontWeight: 500,
  },
};

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://lost-and-found-mps8.onrender.com/api/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (name) =>
    focused === name
      ? { borderColor: "#1D9E75", boxShadow: "0 0 0 3px rgba(29,158,117,0.12)" }
      : {};

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div style={s.page}>
        <div style={s.card}>

          {/* Logo mark */}
          <div style={s.logoWrap}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="6" cy="6" r="2.5" fill="white" />
              <circle cx="12" cy="6" r="2.5" fill="white" opacity="0.6" />
              <circle cx="9" cy="12" r="2.5" fill="white" opacity="0.85" />
            </svg>
          </div>

          <h1 style={s.title}>Welcome back</h1>
          <p style={s.subtitle}>Sign in to manage your lost &amp; found reports.</p>

          <form onSubmit={handleSubmit}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Email address</label>
              <input
                style={{ ...s.input, ...focusStyle("email") }}
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
              />
            </div>

            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <input
                style={{ ...s.input, ...focusStyle("password") }}
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                ...s.button,
                background: loading ? "#0F6E56" : "#1D9E75",
                opacity: loading ? 0.85 : 1,
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = "#0F6E56")}
              onMouseLeave={(e) => !loading && (e.target.style.background = "#1D9E75")}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p style={s.footer}>
            Don't have an account?{" "}
            <Link to="/register" style={s.link}>
              Register
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;
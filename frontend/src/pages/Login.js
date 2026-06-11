import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/chat");
    } catch (err) {
      setError("Google sign in failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <button style={styles.googleButton} onClick={handleGoogle}>
          Sign in with Google
        </button>
        <p style={styles.link}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  box: { background: "white", padding: "40px", borderRadius: "10px", width: "350px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  input: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ddd", boxSizing: "border-box" },
  button: { width: "100%", padding: "10px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "10px" },
  googleButton: { width: "100%", padding: "10px", background: "#4285F4", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", textAlign: "center", marginBottom: "10px" },
  link: { textAlign: "center", marginTop: "15px" }
};

export default Login;
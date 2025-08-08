import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../components/Toast"; // Reusable Toast Component
import "./Login.css";


function Login({ redirectPath = "/pages/Calendar" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ type: "", message: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setToast({ type: "", message: "" });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToast({ type: "success", message: "✅ Login successful!" });
      navigate(redirectPath);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-light bg-background">
        <div
          className="bg-black text-light shadow-lg p-4 m-3 border-bottom border-top border-white"
          style={{
            width: "100%",
            maxWidth: "420px", // Increased from 20% (~200px) to 480px
            borderRadius: "12px",
            fontSize: "1.1rem"
          }}
        >

        <h3 className="text-center mb-4 text-light">🔐 Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
                className="form-control bg-black text-light border-0 border-bottom rounded-0 fs-5 py-3 custom-placeholder"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
               className="form-control bg-black text-light border-0 border-bottom rounded-0 fs-5 py-3 custom-placeholder"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
           <Link
              to="/pages/ForgotPassword"
              className="btn btn-link text-info p-0"
              style={{ fontSize: "0.9rem" }}
            >
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
        </form>
      </div>

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: "", message: "" })} />
    </div>
  );
}

export default Login;

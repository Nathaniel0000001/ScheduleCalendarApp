import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // for custom placeholder styles

function Register({ redirectPath = "/pages/Calendar" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setToast({ type: "", message: "" });

    if (password !== confirmPassword) {
      setToast({ type: "error", message: "❌ Passwords do not match!" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setToast({ type: "success", message: "🎉 Registration successful!" });
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
          maxWidth: "420px",
          borderRadius: "12px",
          fontSize: "1.1rem"
        }}
      >
        <h3 className="text-center mb-4 text-light">📝 Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              className="form-control bg-black text-light border-0 border-bottom rounded-0 fs-5 py-3 custom-placeholder"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          <div className="mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control bg-black text-light border-0 border-bottom rounded-0 fs-5 py-3 custom-placeholder"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-2"
            disabled={password !== confirmPassword}
          >
            Register
          </button>
        </form>
      </div>

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ type: "", message: "" })}
      />
    </div>
  );
}

export default Register;

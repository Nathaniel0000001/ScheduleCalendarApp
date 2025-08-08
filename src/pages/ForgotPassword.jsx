import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Toast from "../components/Toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return setToast({ type: "error", message: "Please enter your email." });

    try {
      await sendPasswordResetEmail(auth, email);
      setToast({ type: "success", message: "📩 Password reset email sent." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center text-light vh-100 bg-background">
      <div
        className="bg-black text-light shadow-lg p-4 m-3 border-bottom border-top border-white"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "12px", fontSize: "1.1rem" }}
      >
        <h3 className="text-center mb-4 text-light">🔑 Reset Password</h3>
        <form onSubmit={handleReset}>
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
          <button type="submit" className="btn btn-primary w-100 mb-2">Send Reset Link</button>
        </form>
      </div>

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: "", message: "" })} />
    </div>
  );
}

export default ForgotPassword;

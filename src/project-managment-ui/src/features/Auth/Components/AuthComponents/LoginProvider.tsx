import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "/Projects/React/ProjectManagmentReactUI/src/project-managment-ui/src/features/Auth/Service/AuthService";
import useAuth from "/Projects/React/ProjectManagmentReactUI/src/project-managment-ui/src/hooks/useAuth"

const LoginProvider: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    const success = await AuthService.login(email, password);
    if (success) {
      authLogin();
      navigate("/welcomePage");
    } else {
      setError("Wrong crenditals.");
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in: </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="message">
            Not have account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginProvider;
import './LoginPage.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./components/Input/PasswordInput";
import { validateEmail } from "./helper";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container-center">
      <div className="card">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-center">
            Not registered yet?{" "}
            <Link to="/signup" className="text-primary">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

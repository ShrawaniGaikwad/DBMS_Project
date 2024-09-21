import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import PasswordInput from "./components/Input/PasswordInput";
import { validateEmail } from "./helper";
import { auth,createUserWithEmailAndPassword } from "../../firebase"; // Import Firebase configuration

const SignUp = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter your username");
      return;
    }

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
      // Sign up with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      // Proceed with your existing API call
      const formData = { username, email, password };
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setName('');
        setEmail('');
        setPassword('');
        navigate("/fill-details"); 

      } else {
        alert('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up.');
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">SignUp</h4>
          <input
            type="text"
            placeholder="Username"
            className="input-box"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button type="submit" className="btn-primary">Create Account</button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

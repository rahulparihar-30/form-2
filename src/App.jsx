import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = {
    email: !form.email
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? "Please enter a valid email address"
      : "",

    password: !form.password
      ? "Password is required"
      : form.password.length < 8
      ? "Password must be at least 8 characters"
      : "",

    confirmPassword: !form.confirmPassword
      ? "Please confirm your password"
      : form.password !== form.confirmPassword
      ? "Passwords do not match"
      : "",
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    const isValid = Object.values(errors).every(
      (error) => error === ""
    );

    if (isValid) {
      alert("Form submitted successfully");
    } else {
      alert("Can't submit the form");
    }
  }

  function getStatus(field) {
    if (!touched[field] && !submitted) return "";

    return errors[field] ? "invalid" : "valid";
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <div className="formFields">
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getStatus("email")}
          />

          {getStatus("email") === "invalid" && (
            <p className="error-message">{errors.email}</p>
          )}
        </div>

        <div className="formFields">
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getStatus("password")}
          />

          {getStatus("password") === "invalid" && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="formFields">
          <label htmlFor="confirmPassword">
            Confirm Password:
          </label>

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getStatus("confirmPassword")}
          />

          {getStatus("confirmPassword") === "invalid" && (
            <p className="error-message">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default App;
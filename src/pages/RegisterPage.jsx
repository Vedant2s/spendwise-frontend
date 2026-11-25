import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./RegisterPage.css";

const encodeBase64 = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        monthlyIncome: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await register({
                username: formData.username.trim(),
                email: formData.email.trim(),
                passwordHash: encodeBase64(formData.password),
                monthlyIncome:
                    formData.monthlyIncome === ""
                        ? null
                        : Number(formData.monthlyIncome),
            });

            if (response?.token) {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <h1>Create an account</h1>
            <p>Start tracking your expenses with SpendWise</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>

                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="monthlyIncome">Monthly Income</label>

                    <input
                        id="monthlyIncome"
                        name="monthlyIncome"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={6}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>

                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength={6}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
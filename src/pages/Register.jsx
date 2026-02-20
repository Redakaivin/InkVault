import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        try {
            await api.post("/auth/register", { email, password });
            alert("Registration successful. Please login.");
            navigate("/");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h2>Register</h2>

                <p className="muted center">
                    Create your InkVault account
                </p>


                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button onClick={register}>Register</button>

                <p style={{ marginTop: "12px", textAlign: "center" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "#4f46e5", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

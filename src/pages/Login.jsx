import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        setError("");
        try {
            const res = await api.post("/auth/login", { email, password });

            // ✅ STORE JWT
            localStorage.setItem("token", res.data.token);

            navigate("/entries");
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError("Invalid email or password");
            } else {
                setError("Something went wrong. Try again.");
            }
        }
    };

    return (
        <div className="page">
            <div className="card">
                <h2>Login</h2>
                <p className="muted center">
                    Welcome to InkVault — your private writing space.
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

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button onClick={login}>Login</button>

                <p style={{ marginTop: 12, textAlign: "center" }}>
                    Don’t have an account?{" "}
                    <span
                        style={{ color: "#ab1313", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Entries() {
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        api.get("/api/entries")
            .then(res => setEntries(res.data))
            .catch(err => {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/");
                } else {
                    alert("Failed to load entries");
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="page">
            <div className="entries-container">
                <div className="entries-header">
                    <h2>Your Entries</h2>
                    <div>
                        <button onClick={() => navigate("/create")}>+ New Entry</button>
                        <button className="secondary" onClick={logout}>Logout</button>
                    </div>
                </div>

                {entries.length === 0 ? (
                    <p className="empty">
                        You haven’t written anything yet. Start your first entry ✍️
                    </p>
                ) : (
                    entries.map(entry => (
                        <div className="card entry-card" key={entry.id}>
                            <h3>{entry.title}</h3>
                            <p>Status: {entry.status}</p>
                            <p className="muted">
                                Created: {new Date(entry.createdAt).toLocaleDateString()}
                            </p>

                            <div className="actions">
                                {entry.status !== "LOCKED" && (
                                    <button onClick={() => navigate(`/edit/${entry.id}`)}>
                                        Edit
                                    </button>
                                )}
                                {entry.status !== "LOCKED" && (
                                    <button
                                        className="secondary"
                                        onClick={() =>
                                            api.post(`/api/entries/${entry.id}/lock`)
                                                .then(() => window.location.reload())
                                        }
                                    >
                                        Lock
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

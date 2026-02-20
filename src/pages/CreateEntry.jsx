import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateEntry() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/api/entries", {
                title,
                content
            });
            navigate("/entries");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create entry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="card" style={{ width: "100%", maxWidth: "600px" }}>
                <h2>Create New Entry</h2>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="Entry Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />

                    <textarea
                        className="entry-editor"
                        placeholder="Start writing your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "10px",
                            backgroundColor: "#1e1e1e",
                            color: "#eaeaea",
                            border: "1px solid #333",
                            borderRadius: "6px",
                            resize: "vertical",
                            minHeight: "200px",
                            fontFamily: "inherit"
                        }}
                    />

                    {error && <p className="error">{error}</p>}

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        <button type="submit" disabled={loading} style={{ flex: 1 }}>
                            {loading ? "Creating..." : "Create Entry"}
                        </button>
                        <button
                            type="button"
                            className="secondary"
                            onClick={() => navigate("/entries")}
                            style={{ flex: 1 }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
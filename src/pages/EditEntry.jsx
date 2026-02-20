import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditEntry() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Load entry
    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const res = await api.get(`/api/entries/${id}`);

                setTitle(res.data.title);
                setContent(res.data.latestContent);
            } catch {
                setError("Failed to load entry");
            } finally {
                setLoading(false);
            }
        };

        fetchEntry();
    }, [id]);

    // 🔹 Save (creates NEW VERSION)
    const handleSave = async () => {
        try {
            await api.put(`/api/entries/${id}`, {
                content
            });

            navigate("/entries");
        } catch {
            setError("Failed to update entry");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="page">
            <div className="editor-card">

                <h2>Edit Entry</h2>

                <input
                    value={title}
                    disabled
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={14}
                />

                {error && <p className="error">{error}</p>}

                <div className="editor-actions">
                    <button onClick={handleSave}>Save Changes</button>

                    <button
                        className="secondary"
                        onClick={() => navigate("/entries")}
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

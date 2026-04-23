import { useEffect, useState } from "react";
import axios from "axios";

const s = {
  page: {
    minHeight: "100vh",
    background: "#f5f4f0",
    fontFamily: "'DM Sans', sans-serif",
    padding: "2rem 1rem",
  },
  container: {
    maxWidth: "860px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "2rem",
  },
  logoWrap: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "#1D9E75",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "24px",
    fontWeight: 400,
    color: "#1a1a1a",
    margin: 0,
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "1.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.05)",
    marginBottom: "1.5rem",
  },
  cardTitle: {
    fontSize: "11px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#aaa",
    margin: "0 0 1.25rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    marginBottom: "1rem",
  },
  fieldWrap: { display: "flex", flexDirection: "column", gap: "5px" },
  label: {
    fontSize: "11px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#999",
  },
  input: {
    padding: "9px 12px",
    border: "1px solid #e2e2de",
    borderRadius: "9px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a1a",
    background: "#fafaf8",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    width: "100%",
    boxSizing: "border-box",
  },
  select: {
    padding: "9px 12px",
    border: "1px solid #e2e2de",
    borderRadius: "9px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a1a",
    background: "#fafaf8",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  btnRow: { display: "flex", gap: "10px", marginTop: "0.25rem" },
  btnPrimary: {
    padding: "10px 22px",
    borderRadius: "9px",
    border: "none",
    background: "#1D9E75",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  btnGhost: {
    padding: "10px 18px",
    borderRadius: "9px",
    border: "1px solid #e2e2de",
    background: "transparent",
    color: "#666",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#aaa",
    margin: "0 0 1rem",
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "14px",
  },
  itemCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "1.25rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 2px 12px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "4px",
  },
  itemName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "17px",
    fontWeight: 400,
    color: "#1a1a1a",
    margin: 0,
  },
  itemDesc: { fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.5 },
  itemMeta: { fontSize: "12px", color: "#999", margin: 0 },
  editBtn: {
    padding: "6px 14px",
    borderRadius: "7px",
    border: "1px solid #e2e2de",
    background: "transparent",
    color: "#555",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    flexShrink: 0,
    transition: "background 0.15s, border-color 0.15s",
  },
  empty: {
    textAlign: "center",
    color: "#bbb",
    fontSize: "14px",
    padding: "2rem 0",
  },
};

const Badge = ({ type }) => (
  <span
    style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 500,
      background: type === "Lost" ? "#FEF3C7" : "#D1FAE5",
      color: type === "Lost" ? "#92400E" : "#065F46",
    }}
  >
    {type}
  </span>
);

function Field({ label, children }) {
  return (
    <div style={s.fieldWrap}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  );
}

function Dashboard() {
  const API = "http://localhost:5000";

  const [items, setItems] = useState([]);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    contactInfo: "",
  });

  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get(`${API}/api/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/api/items`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
      clearForm();
    } catch {
      alert("Error adding item");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API}/api/items/${editId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
      clearForm();
    } catch {
      alert("Error updating item");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setForm({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      contactInfo: item.contactInfo,
    });
    setEditId(item._id);
  };

  const clearForm = () => {
    setForm({ itemName: "", description: "", type: "Lost", location: "", contactInfo: "" });
    setEditId(null);
  };

  const focusStyle = (name) =>
    focused === name
      ? { borderColor: "#1D9E75", boxShadow: "0 0 0 3px rgba(29,158,117,0.12)" }
      : {};

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div style={s.page}>
        <div style={s.container}>

          {/* Header */}
          <div style={s.header}>
            <div style={s.logoWrap}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="6" cy="6" r="2.5" fill="white" />
                <circle cx="12" cy="6" r="2.5" fill="white" opacity="0.6" />
                <circle cx="9" cy="12" r="2.5" fill="white" opacity="0.85" />
              </svg>
            </div>
            <h1 style={s.title}>Dashboard</h1>
          </div>

          {/* Form Card */}
          <div style={s.card}>
            <p style={s.cardTitle}>{editId ? "Edit item" : "Report an item"}</p>
            <div style={s.grid}>
              <Field label="Item name">
                <input
                  style={{ ...s.input, ...focusStyle("itemName") }}
                  placeholder="e.g. Blue backpack"
                  value={form.itemName}
                  onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                  onFocus={() => setFocused("itemName")}
                  onBlur={() => setFocused("")}
                />
              </Field>

              <Field label="Description">
                <input
                  style={{ ...s.input, ...focusStyle("description") }}
                  placeholder="Brief description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  onFocus={() => setFocused("description")}
                  onBlur={() => setFocused("")}
                />
              </Field>

              <Field label="Type">
                <select
                  style={s.select}
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </Field>

              <Field label="Location">
                <input
                  style={{ ...s.input, ...focusStyle("location") }}
                  placeholder="Where was it lost/found?"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  onFocus={() => setFocused("location")}
                  onBlur={() => setFocused("")}
                />
              </Field>

              <Field label="Contact info">
                <input
                  style={{ ...s.input, ...focusStyle("contactInfo") }}
                  placeholder="Phone or email"
                  value={form.contactInfo}
                  onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
                  onFocus={() => setFocused("contactInfo")}
                  onBlur={() => setFocused("")}
                />
              </Field>
            </div>

            <div style={s.btnRow}>
              <button
                style={{
                  ...s.btnPrimary,
                  background: loading ? "#0F6E56" : "#1D9E75",
                  opacity: loading ? 0.85 : 1,
                }}
                onClick={editId ? handleUpdate : handleAdd}
                disabled={loading}
              >
                {loading ? "Saving…" : editId ? "Update item" : "Add item"}
              </button>
              <button style={s.btnGhost} onClick={clearForm}>
                Clear
              </button>
            </div>
          </div>

          {/* Items List */}
          <p style={s.sectionLabel}>{items.length} item{items.length !== 1 ? "s" : ""} reported</p>

          {items.length === 0 ? (
            <p style={s.empty}>No items yet. Report one above.</p>
          ) : (
            <div style={s.itemsGrid}>
              {items.map((item) => (
                <div key={item._id} style={s.itemCard}>
                  <div style={s.itemHeader}>
                    <h3 style={s.itemName}>{item.itemName}</h3>
                    <button
                      style={s.editBtn}
                      onClick={() => handleEditClick(item)}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f5f4f0";
                        e.target.style.borderColor = "#ccc";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.borderColor = "#e2e2de";
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <Badge type={item.type} />
                  <p style={s.itemDesc}>{item.description}</p>
                  <p style={s.itemMeta}>📍 {item.location}</p>
                  <p style={s.itemMeta}>✉ {item.contactInfo}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    contactInfo: ""
  });

  const API = "https://lost-and-found-mps8.onrender.com";

  // 🔹 Fetch user + items
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // user info
      const userRes = await axios.get(`${API}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userRes.data);

      // items
      const itemsRes = await axios.get(`${API}/api/items`);
      setItems(itemsRes.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Add item
  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API}/api/items`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Item added successfully");

      // reset form
      setForm({
        itemName: "",
        description: "",
        type: "Lost",
        location: "",
        contactInfo: ""
      });

      fetchData();

    } catch (error) {
      alert(error.response?.data?.message || "Error adding item");
    }
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>📦 Lost & Found Dashboard</h2>

        <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* USER INFO */}
      {user && (
        <div style={styles.userCard}>
          <h3>👤 {user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}

      {/* ADD ITEM FORM */}
      <div style={styles.formCard}>
        <h3>➕ Add Item</h3>

        <form onSubmit={handleAddItem} style={styles.form}>
          <input
            placeholder="Item Name"
            value={form.itemName}
            onChange={(e) =>
              setForm({ ...form, itemName: e.target.value })
            }
            required
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            placeholder="Contact Info"
            value={form.contactInfo}
            onChange={(e) =>
              setForm({ ...form, contactInfo: e.target.value })
            }
          />

          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* ITEMS */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading items...</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item._id} style={styles.card}>
              <h3>{item.itemName}</h3>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    item.type === "Lost" ? "#ff4d4f" : "#52c41a"
                }}
              >
                {item.type}
              </span>

              <p>{item.description}</p>
              <p><strong>📍 Location:</strong> {item.location}</p>
              <p><strong>📞 Contact:</strong> {item.contactInfo}</p>

              {item.user && (
                <p style={styles.userTag}>
                  Posted by: {item.user.name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;



// 🎨 STYLES
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  logoutBtn: {
    padding: "8px 14px",
    background: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  userCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  formCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  form: {
    display: "grid",
    gap: "10px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    position: "relative"
  },

  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "4px 8px",
    borderRadius: "6px",
    color: "white",
    fontSize: "12px"
  },

  userTag: {
    fontSize: "12px",
    color: "#888",
    marginTop: "10px"
  }
};
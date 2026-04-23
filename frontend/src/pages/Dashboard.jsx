import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "https://lost-and-found-mps8.onrender.com/api/items"
      );
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* Header */}
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

      {/* Loading */}
      {loading ? (
        <p>Loading items...</p>
      ) : items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item._id} style={styles.card}>
              
              <h3>{item.itemName}</h3>
              <p><strong>Type:</strong> {item.type}</p>
              <p>{item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Contact:</strong> {item.contactInfo}</p>

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
    fontFamily: "Arial"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutBtn: {
    padding: "8px 12px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }
};
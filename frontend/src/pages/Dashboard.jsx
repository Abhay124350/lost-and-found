import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get("https://lost-and-found-mps8.onrender.com/");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {items.map(item => (
        <div key={item._id}>
          <h3>{item.itemName}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
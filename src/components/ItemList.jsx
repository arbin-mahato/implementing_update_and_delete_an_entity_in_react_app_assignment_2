import { useEffect, useState } from "react";

function ItemList({ API_URI }) {
  const [items, setItems] = useState([]);

  // Fetch items from the API
  useEffect(() => {
    fetch(API_URI)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, [API_URI]);

  // Handle delete item
  const handleDelete = (id) => {
    fetch(`${API_URI}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted item from the state
          setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              {item.name}{" "}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
}

export default ItemList;

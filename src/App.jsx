import "./App.css";

import { useState, useEffect } from "react";

const url = "http://localhost:3004/products";

function App() {
  const [produtcs, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1- Get dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }

    fetchData();
  }, []);

  console.log("Produts GET: ", produtcs);

  // 2- Add products
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    console.log("Produts Before POST: ", product);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  return (
    <div className="App">
      {" "}
      <h1>Lista de produtos</h1>{" "}
      <ul>
        {produtcs.map((produtcs) => (
          <li key={produtcs.id}>
            {produtcs.name} - R${produtcs.price}
          </li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;

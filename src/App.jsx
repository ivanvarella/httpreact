import "./App.css";

import { useState, useEffect } from "react";

const url = "http://localhost:3004/products";

function App() {
  const [produtcs, setProducts] = useState([]);

  // 1- Resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }

    fetchData();
  }, []);

  console.log("Produts: ", produtcs);

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
    </div>
  );
}

export default App;

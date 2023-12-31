import "./App.css";

import { useState } from "react";

// 4- Custom hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3004/products";

function App() {
  //4- Custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url); //Getting Data to items

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 2- Add Products
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // 5- Refactoring Post
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  // 8- Delete Product
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <div className="products">
        <h1>Lista de produtos</h1> {/* 6- Loading */}
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        {!loading && (
          <ul>
            {items &&
              items.map((product) => (
                <li key={product.id}>
                  {product.name} - R$: {product.price}{" "}
                  <button onClick={() => handleRemove(product.id)}>
                    Excluir
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

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
          {/* 7- Loading state during POST */}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;

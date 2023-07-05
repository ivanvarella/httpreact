import "./App.css";

import { useState } from "react";

// 4- Custom hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3004/products";

function App() {
  //const [products, setProducts] = useState([]);

  //4- Custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url); //Getting Data to items

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1- Getting data (comentado após a criação do custom hook useFetch)
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }

  //   fetchData();
  // }, []);

  // 2- Add Products
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };
    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // // 3- Dynamic reload
    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

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
      {" "}
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

import { useState, useEffect } from "react";

// 4- Custom hook

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 5- Refactoring Post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // 6- Loading
  const [loading, setLoading] = useState(false);

  // 7- Error handling
  const [error, setError] = useState(null);

  // 8- DELETE
  const [itemID, setItemId] = useState(null);

  const httpConfig = (data, method) => {
    //POST
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
      //DELETE
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMethod(method);
      setItemId(data);
    }
  };

  useEffect(() => {
    //Get the data from DB
    const fetchData = async () => {
      // 6- Loading
      setLoading(true);

      // 7- Error handling
      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log("Erro: ", error.message);
        setError("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  //5- Make the POST
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        let fetchOptions = [url, config]; // URL + config: {method, headers, body}

        const res = await fetch(...fetchOptions);

        json = await res.json();
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemID}`;

        const res = await fetch(deleteUrl, config);

        json = await res.json();
      }
      setCallFetch(json);
    };

    httpRequest();
  }, [config, method, url, itemID]);

  return { data, httpConfig, loading, error };
};

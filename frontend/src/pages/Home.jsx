import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const Home = () => {
  const [loggedInUser, setloggedInUser] = useState("");
  const [products, setproducts] = useState([]);

  useEffect(() => {
    setloggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const Navigate = useNavigate();

  const handleLogout = () => {
    handleSuccess(`${loggedInUser} logout successfully!...`);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      Navigate("/login");
    }, 2000);
  };
  const API=import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${API}/products`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          handleError(result.message);
          return;
        }

        setproducts(result);
        handleSuccess("Fetch information successfully...");
      } catch (err) {
        handleError(err.message || "Something went wrong!");
      }
    };

    fetchProducts();
  }, [API]);


  return (
    <div>
      <h1>{loggedInUser}</h1>
      <div>
        {products.map((item, index) => (
          <ul key={index}>
            <span>
              {item.name} : {item.price}
            </span>
          </ul>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

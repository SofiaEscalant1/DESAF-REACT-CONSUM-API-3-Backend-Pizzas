
import { useState, useEffect } from "react";
import "./App.css";

const PizzaCard = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas/p001");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPizza(data);
      } catch (err) {
        console.error("Error al obtener la pizza:", err);
        setError(err.message || "Error al cargar la pizza");
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, []);

  const handleAddToCart = () => {
    alert(`Añadido ${pizza?.name} al carrito`);
  };

  if (loading) return <div className="loading">Cargando pizza...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <article className="pizza-card single">
      {pizza?.img && (
        <img src={pizza.img} alt={pizza.name} className="pizza-img" />
      )}
      <h2 className="pizza-name">{pizza?.name}</h2>
      {pizza?.desc && <p className="pizza-desc">{pizza.desc}</p>}
      {pizza?.ingredients && (
        <p className="pizza-ingredients">{Array.isArray(pizza.ingredients) ? pizza.ingredients.join(", ") : pizza.ingredients}</p>
      )}
      <p className="pizza-price">Precio: ${pizza?.price}</p>
      <button onClick={handleAddToCart} className="add-cart-btn">Añadir al carrito</button>
    </article>
  );
};

export default PizzaCard;

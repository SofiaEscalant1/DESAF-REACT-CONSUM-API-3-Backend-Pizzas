
import { useState, useEffect } from "react";
import "./App.css";

function Home() {
    
    const [pizzas, setPizzas] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        const consultarApi = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/pizzas/");
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                const pizzasList = Array.isArray(data) ? data : [];
                setPizzas(pizzasList);
            } catch (err) {
                console.error("Error al consultar la API:", err);
                setError(err.message || "Error al cargar pizzas");
            } finally {
                setLoading(false); 
            }
        };

        consultarApi();
    }, []);

    return (
        <div className="pizzas-grid">
            {loading && <div className="loading">Cargando pizzas...</div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !error && pizzas.length === 0 && <p>No hay pizzas disponibles.</p>}

            {!loading && !error && pizzas.map((p, index) => {
                const imgSrc = p.img || "";

                return (
                    <article className="pizza-card" key={p.id || p._id || p.name}>
                        {imgSrc && (
                            <img
                                src={imgSrc}
                                alt={p.name}
                                className="pizza-img"
                            />
                        )}

                        <h3 className="pizza-name">{p.name}</h3>

                        {p.desc && <p className="pizza-desc">{p.desc}</p>}

                        {p.ingredients && (
                            <p className="pizza-ingredients">{Array.isArray(p.ingredients) ? p.ingredients.join(", ") : p.ingredients}</p>
                        )}

                        <p className="pizza-price">Precio: ${p.price}</p>

                        {index === 0 && (
                            <button type="button" className="add-cart-btn" onClick={() => {}}>
                                Agregar al carrito de compras
                            </button>
                        )}
                    </article>
                );
            })}
        </div>
    );
}

export default Home;
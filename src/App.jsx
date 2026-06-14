import "./App.css";
import Home from "./Home";
import PizzaCard from "./Pizza";

const App = () => {
    const path = typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "/";
    const isPizzaPage = path === "/pizza" || path === "/pizza/";

    return (
        <div className="app">
            <header className="app-header">
                <h1>Pizzería</h1>
            </header>
            <main>
                {isPizzaPage ? <PizzaCard /> : <Home />}
            </main>
        </div>
    );
};

export default App;


import "./App.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NE9KPCmCkGDG8piOjqCuusViqzapvuJS6zlFufUIeTKFPEG8EqjQVrDi7MkYL7cYK7mzfb8RtmboI2eqL73qodR00i4Zo28Fs"
);

function App() {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:8080/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="App">
      <h1>Stripe Checkout</h1>
      <button onClick={handleClick}>Integrate</button>
    </div>
  );
}

export default App;

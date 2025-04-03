// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1>React app</h1>
//     </>
//   );
// }

// export default App;

import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Success from "./components/success";
import Cancel from "./components/cancel";
import CheckoutButton from "./components/check-out";
import PayStackCheckout from "./components/paystackCheckout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/check-out" element={<CheckoutButton />} />
      <Route path="/paystack-checkout" element={<PayStackCheckout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;

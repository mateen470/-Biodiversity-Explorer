import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import { ConservationAction } from "./pages/ConservationAction";

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conservation/:id" element={<ConservationAction />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

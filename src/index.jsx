import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "../components/Header";
import Main from "../components/Main";

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

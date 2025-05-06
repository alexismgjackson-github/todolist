import { StrictMode } from "react"; // Import StrictMode for development checks
import { createRoot } from "react-dom/client"; // Import React's createRoot method for rendering the app
import Header from "../components/Header"; // Import the Header component
import Main from "../components/Main"; // Import the Main component

// Define the main App component that renders Header and Main components
function App() {
  return (
    <>
      <Header /> {/* Render Header component */}
      <Main /> {/* Render Main component */}
    </>
  );
}

// Select the root DOM element to render the React app
const container = document.getElementById("root");
const root = createRoot(container); // Create the root of the app

// Render the app within StrictMode for highlighting potential issues in development
root.render(
  <StrictMode>
    <App /> {/* Render the App component */}
  </StrictMode>
);

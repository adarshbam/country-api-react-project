import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

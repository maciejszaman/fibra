import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Browser } from "./components/Browser/Browser";
import { NotFound } from "./components/NotFound/NotFound";
import { Settings } from "./components/Settings/Settings";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/files/" replace />} />
            <Route path="/files/*" element={<Browser />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

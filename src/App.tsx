import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Browser } from "./components/Browser/Browser";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/files/" replace />} />
          <Route path="/files/*" element={<Browser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

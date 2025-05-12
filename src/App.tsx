import { useState } from "react";
import "./App.css";
import { Foldertree } from "./components/FolderTree/Foldertree";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Browser } from "./components/Browser/Browser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/files/" replace />} />
          <Route path="/files/*" element={<Browser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

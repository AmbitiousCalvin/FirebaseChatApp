import "./styles/styles.scss";
import { Header } from "./layout/header";
import { Sidebar } from "./layout/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { useLayoutContext } from "./contexts/layoutContext";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Header />

      {/* ===============================d 2
      ============== */}

      <main className="layout">
        <div className="sidebar-container-parent">
          <Sidebar />
        </div>
        {/* ============================================= */}

        <section className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<HomePage />} />
          </Routes>
        </section>

        {/* ============================================= */}
      </main>
    </Router>
  );
}

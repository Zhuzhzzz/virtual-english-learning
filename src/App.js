// #file: src/App.js
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AnnotatePage from './pages/AnnotatePage';
import DemoPage from './pages/DemoPage';
import HomePage from './pages/HomePage';
import './assets/styles.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-language me-2"></i>
            英语学习
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  <i className="fas fa-home me-1"></i>
                  首页
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/annotate' ? 'active' : ''}`}
                  to="/annotate"
                >
                  <i className="fas fa-edit me-1"></i>
                  单词管理
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/demo' ? 'active' : ''}`}
                  to="/demo"
                >
                  <i className="fas fa-book-reader me-1"></i>
                  开始学习
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/annotate" element={<AnnotatePage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </main>

      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2024 虚拟人英语单词学习平台</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Gold from "./pages/Gold";
import Orchid from "./pages/Orchid";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

const App = () => {
  return (
    <AuthProvider>

    <Router>
      <Routes>
      <Route path="/" element={
        <DefaultLayout>
          <Home />
        </DefaultLayout>} />
        <Route path="/gold-prediction" element={
        <DefaultLayout>
          <Gold />
        </DefaultLayout>} />
        
        <Route path="/orchid-prediction" element={
        <DefaultLayout>
          <Orchid />
        </DefaultLayout>} />

        <Route path="/login" element={
        <DefaultLayout>
          <Login />
        </DefaultLayout>} />
      </Routes>
    </Router>
    </AuthProvider>

  );
};

export default App;

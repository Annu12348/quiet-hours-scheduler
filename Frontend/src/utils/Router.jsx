import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddBlock from "../pages/AddBlock";
import UpdateBlock from "../pages/UpdateBlock";
import Protected from "../components/Protected";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/crete-block"
        element={
          <Protected>
            <AddBlock />
          </Protected>
        }
      />
      <Route
        path="/Update-block/:id"
        element={
          <Protected>
            <UpdateBlock />
          </Protected>
        }
      />
    </Routes>
  );
};

export default Router;

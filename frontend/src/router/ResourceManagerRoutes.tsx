import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/account-manager/Dashboard";
import ManageResource from "../components/account-manager/ManageResource";
import UpdateResource from "../components/account-manager/UpdateResource";
import Profile from "../containers/Profile";

export default function ResourceManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/manageresource" element={<ManageResource />} />
      <Route path="/manageresource/:code" element={<ManageResource />} />
      <Route path="/updateresource/:id" element={<UpdateResource />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

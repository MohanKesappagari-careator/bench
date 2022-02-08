import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateUser from "../components/admin/CreateUser";
import Dashboard from "../components/admin/Dashboard";
import ManageUser from "../components/admin/ManageUser";
import UpdateUser from "../components/admin/UpdateUser";
import Profile from "../containers/Profile";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/createuser" element={<CreateUser />} />
      <Route path="/updateuser/:id" element={<UpdateUser />} />
      <Route path="/manageuser" element={<ManageUser />} />
      <Route path="/manageuser/:code" element={<ManageUser />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

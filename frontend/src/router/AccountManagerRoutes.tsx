import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateResource from "../components/account-manager/CreateResource";
import Dashboard from "../components/account-manager/Dashboard";
import ManageResource from "../components/account-manager/ManageResource";
import ResourceDetails from "../components/account-manager/ResourceDetails";
import UpdateResource from "../components/account-manager/UpdateResource";
import Profile from "../containers/Profile";

export default function AccountManagerRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/createresource" element={<CreateResource />} />
			<Route path="/manageresource" element={<ManageResource />} />
			<Route path="/manageresource/:code" element={<ManageResource />} />
			<Route path="/updateresource/:id" element={<UpdateResource />} />
			<Route path="/resourcedetails/:id" element={<ResourceDetails />} />
			<Route path="/profile" element={<Profile />} />
		</Routes>
	);
}

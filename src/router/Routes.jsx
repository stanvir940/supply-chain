import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../home/Home";
import FormComponent from "../form/FormComponent";
import Login from "../login/Login.jsx";
import AdminDashboard from "../admin/AdminDashboard.jsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/buy_form",
        element: <FormComponent></FormComponent>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/admin",
        element: <AdminDashboard></AdminDashboard>,
      },
    ],
  },
]);

export default Routes;

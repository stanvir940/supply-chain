import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../home/Home";
import FormComponent from "../form/FormComponent";

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
    ],
  },
]);

export default Routes;

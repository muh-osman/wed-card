//React router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Pages & Components
// import Home from "./pages/Home/Home";
import Card from "./pages/Card/Card";
import SignIn from "./dashboard/SignIn/SignIn";
import Auth from "./utils/Auth";
import ResponsiveDrawer from "./dashboard/Drawer/ResponsiveDrawer";
import DashIndex from "./dashboard/DashIndex/DashIndex";

import CardEditPage from "./dashboard/CardEditPage/CardEditPage";
import AddPage from "./dashboard/AddPage/AddPage";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">

          <Route index element={<SignIn />} />
          <Route path="card/:id" element={<Card />} />
          {/* <Route path="admin" element={<SignIn />} /> */}


          {/* Protected route */}
          <Route element={<Auth />}>
            <Route path="dashboard" element={<ResponsiveDrawer />} >

              <Route index element={<DashIndex />} />
              <Route path="create" element={<AddPage />} />
              <Route path="edit/:id" element={<CardEditPage />} />

            </Route>
          </Route>

      </Route>
    )
  );





  return <RouterProvider router={router} />
}

export default App;

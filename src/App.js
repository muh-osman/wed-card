//React router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Utils
import Auth from "./utils/Auth";
// Pages & Components
import SignIn from "./dashboard/SignIn/SignIn";
import Card from "./pages/Card/Card";
import Table from "./pages/Table/Table";
import ResponsiveDrawer from "./dashboard/Drawer/ResponsiveDrawer";
import Index from "./dashboard/Index/Index";
import Create from "./dashboard/Create/Create";
import Edit from "./dashboard/Edit/Edit";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<SignIn />} />
        <Route path="card/:id" element={<Card />} />
        <Route path="table/:id" element={<Table />} />

        <Route element={<Auth />}>
          {/* Start Protected route */}
          <Route path="dashboard" element={<ResponsiveDrawer />}>
            <Route index element={<Index />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
          {/* End Protected route */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

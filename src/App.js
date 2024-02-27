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
import Card from "./pages/Card/Card";
import SignIn from "./dashboard/SignIn/SignIn";
import ResponsiveDrawer from "./dashboard/Drawer/ResponsiveDrawer";
import Index from "./dashboard/Index/Index";
import Create from "./dashboard/Create/Create";
import Edit from "./dashboard/Edit/Edit";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<SignIn />} />
        <Route path="card/:id" element={<Card />} />

        <Route element={<Auth />}>
          {/* Protected route */}
          <Route path="dashboard" element={<ResponsiveDrawer />}>
            <Route index element={<Index />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
          {/* Protected route */}
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

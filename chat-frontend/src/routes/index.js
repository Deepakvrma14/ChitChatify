import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";
// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/customMui/LoadingScreen";

const Loadable = (Component) => {
  const LoadableComponent = (props) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || "Component"})`;

  return LoadableComponent;
};
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Profile  = Loadable(lazy(()=> import("../pages/dashboard/Profile")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const ForgotPassword = Loadable(lazy(() => import("../pages/auth/ForgotPassword")));
const NewPassword = Loadable(lazy(() => import("../pages/auth/NewPassword")));

const routes = [
  {
    path: "/auth",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "reset-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "new-password",
        element: <NewPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        element: <Navigate to={DEFAULT_PATH} replace />,
        index: true,
      },
      {
        path: "app",
        element: <GeneralApp />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "*",
        element: <Navigate to="/404" replace />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/404" replace /> },
];

export default function Router() {
  return useRoutes(routes);
}

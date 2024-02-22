import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

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
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const routes = [
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

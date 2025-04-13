import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import IndexPage from "./pages";
import CreateExpenseBookPage from "./pages/create";

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </>
  ),
});

// Create routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

const createExpenseBookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CreateExpenseBookPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, createExpenseBookRoute]);

// Create the router
export const router = createRouter({ routeTree });

// Register router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

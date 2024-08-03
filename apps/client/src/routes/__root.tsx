import React, { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavbarItem } from '../components/NavbarItem';
import { NavbarDivider } from '../components/NavbarDivider';
import { FaMusic, FaCog } from "react-icons/fa";
const TanStackRouterDevtools =
  import.meta.env.PROD
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="page">
        <div className="navbar">
          <NavbarItem to="/" icon={<FaMusic size="25" />} text="Playlist Management"/>
          <NavbarDivider />
          <NavbarItem to="/config" icon={<FaCog size="25" />} text="Settings" />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Suspense>
        <TanStackRouterDevtools position='top-right' />
      </Suspense>
    </>
  ),
});
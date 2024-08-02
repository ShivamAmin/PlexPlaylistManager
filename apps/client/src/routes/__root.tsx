import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { FaMusic, FaCog } from "react-icons/fa";
import { IconBaseProps } from 'react-icons/lib'
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
      <div className="flex">
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-primary text-secondary shadow first:pt-2">
          <Link to="/">
            <SidebarIcon icon={<FaMusic size="25" />} text="Playlist Management" />
          </Link>
          <Link to="/config" className="mb-0">
            <SidebarIcon icon={<FaCog size="25" />} text="Settings" />
          </Link>
          <Link to="/config" className="mt-auto">
            <SidebarIcon icon={<FaCog size="25" />} text="Settings" />
          </Link>
        </div>
      </div>
      <div className="page">
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})

interface SidebarIcon extends IconBaseProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Text to show in tooltip */
  text: string;
}

const SidebarIcon = ({ icon, text }: SidebarIcon) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);
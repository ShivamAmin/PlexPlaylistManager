import React from 'react';
import { Link } from '@tanstack/react-router';

interface NavbarItem {
  /** Destination path */
  to: string,
  /** Icon to display */
  icon: React.ReactNode;
  /** Text to show in tooltip */
  text: string;
}

export const NavbarItem = ({ to, icon, text }: NavbarItem) => (
  <Link to={to} className="navbar-icon group">
    {icon}
    <span className="navbar-tooltip group-hover:scale-100">
      {text}
    </span>
  </Link>
);
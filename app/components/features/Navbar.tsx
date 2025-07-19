import Link from "next/link";
import React from "react";
import { links } from "@/app/constants";
import { FaCog, FaHome, FaFootballBall } from "react-icons/fa";

const Navbar = () => {
  links.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <nav className="bg-zinc-200 text-black w-64 min-h-screen p-4">
      <div className="flex flex-col items-center">
        {/* Header section with icon and title */}
        <div className="flex flex-col items-center mb-4 mt-2">
          <h1 className="text-2xl font-bold pb-2">Dynasty</h1>
          <FaFootballBall className="w-10 h-10 text-primary mb-2" />
          <h1 className="text-2xl font-bold">Manager</h1>
        </div>
        <div className="divider my-2 w-full"></div>
        <div className="w-full flex flex-col gap-1 mt-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-base font-semibold hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            <FaHome className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-base font-semibold hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          ))}

          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-base font-semibold hover:bg-blue-100 hover:text-blue-700 transition-colors mt-2"
          >
            <FaCog className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="w-full bg-green-500">
        <nav className="w-[96%] md:w-[80%] mx-auto flex items-center justify-between py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white cursor-pointer">
              Logo
            </h1>
          </Link>
          <ul className="flex items-center gap-x-5">
            <li className="text-base cursor-pointer">
              <Link
                href={"/"}
                className="text-white hover:text-blue-600 transition-all duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li className="text-base cursor-pointer">
              <Link
                href={"/login"}
                className="text-white hover:text-blue-600 transition-all duration-300"
              >
                Login
              </Link>
            </li>
            <li className="text-base cursor-pointer">
              <Link
                href={"/register"}
                className="text-white hover:text-blue-600 transition-all duration-300"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

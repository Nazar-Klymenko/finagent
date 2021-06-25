import React, { FC, useState, useEffect } from "react";
import { Logo } from "@components/svgs/Logo";
import { useMediaQuery } from "react-responsive";
import { ServicesPopover } from "./Popovers";
import { Heart } from "@components/svgs/Services";
import Link from "next/link";

const Nav: FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    if (isDesktop) {
      setNavOpen(false);
    }
  }, [isDesktop]);

  return (
    <nav
      className={`sticky h-14 bg-white w-full z-30 top-0 right-0 ${
        navOpen ? "" : "shadow"
      }`}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 sm:w-52 flex items-center">
          <Link href="/">
            <a>
              <Logo fillColor="#262d3d" />
            </a>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <ServicesPopover />
          <a className="text-sm text-gray-400 hover:text-black focus:text-black mx-4 px-2">
            Contact
          </a>
          <a className="text-sm text-gray-400 hover:text-black focus:text-black  mx-4 px-2">
            Help
          </a>
        </div>

        <div className="hidden pr-4 w-52 md:flex items-center">
          <a className="mx-1 px-4 py-1 w-24 flex justify-center items-center font-medium rounded text-sm text-blue-500 bg-white border border-blue-500">
            login
          </a>
          <a className="mx-1  px-4 py-1 w-24 flex justify-items-center items-center font-medium rounded text-sm  text-white border border-transparent bg-blue-500">
            sign up
          </a>
        </div>

        <div className="flex">
          <a className="mx-4 flex px-4 py-1 w-24 md:hidden justify-center items-center  rounded text-sm font-medium text-blue-500 border border-blue-500">
            login
          </a>

          <Hamburger navOpen={navOpen} setNavOpen={setNavOpen} />
        </div>
      </div>
      {navOpen && <OpenNav />}
    </nav>
  );
};
export default Nav;

const Hamburger: FC<HamburgerProps> = ({ navOpen, setNavOpen }) => {
  function SwitchNavState() {
    setNavOpen(!navOpen);
  }
  return (
    <div
      onClick={SwitchNavState}
      className="md:hidden relative block w-5 h-8 mr-4 p-3 pr-4 cursor-pointer overflow-hidden"
    >
      <span
        className={`block absolute left-0 top-1/4 h-0.5 w-8 bg-current transition duration-300 ease-in-out transform ${
          navOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block absolute left-0 top-1/2 h-0.5 w-8 bg-current transition duration-300 ease-in-out ${
          navOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block absolute left-0 top-3/4 h-0.5  w-8 bg-current transition duration-300 ease-in-out transform ${
          navOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
};

const OpenNav: FC = () => {
  return (
    <div className="z-20 absolute flex flex-col w-full flex-1 justify-center shadow bg-white">
      <a className="w-full block p-4  border-t border-gray-300">Services</a>
      <a className="w-full block p-4  border-t border-gray-300">Contact</a>
      <a className="w-full block p-4 border-t border-b  border-gray-300">
        Help
      </a>
    </div>
  );
};

type HamburgerProps = {
  navOpen: boolean;
  setNavOpen: (state: boolean) => void;
};

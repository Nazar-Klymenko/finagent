import React, { FC } from "react";
import { Popover } from "@headlessui/react";
import { Heart, Travel } from "@components/svgs/Services";
import Link from "next/link";
import { Chevron } from "@components/svgs/Chevron";

export const ServicesPopover: FC = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`text-sm flex text-gray-400 hover:text-black mx-4 px-2 focus:outline-none ${
              open ? "text-black" : ""
            }`}
          >
            Services
            <Chevron />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 w-auto max-w-3xl mt-7 transform -translate-x-1/2 left-1/2">
            <div className="flex p-8 shadow-xl rounded-lg bg-white border border-gray-200">
              <div className="min-w-max mr-4">
                <p className="font-medium text-gray-400">Insurances</p>
                <Item href="/analytics" icon={<Heart />}>
                  Health
                </Item>
                <Item href="/engagement" icon={<Travel />}>
                  Travel
                </Item>
                <Item href="/engagement" icon={<Heart />}>
                  Diagnostic {"&"} Specialist access
                </Item>
                <Item href="/security" icon={<Heart />}>
                  Transport
                </Item>
                <Item href="/integrations" icon={<Heart />}>
                  Real Estate
                </Item>
              </div>

              <div className="min-w-max ml-4">
                <p className="font-medium text-gray-400">Loans</p>
                <Item href="/analytics" icon={<Heart />}>
                  Cash
                </Item>
                <Item href="/engagement" icon={<Heart />}>
                  Mortgage
                </Item>
              </div>
            </div>
            <img src="/solutions.jpg" alt="" />
            <span className="absolute rounded-xs left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 h-4 w-4 bg-white border border-gray-200 border-r-0 border-b-0"></span>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

type ItemProps = {
  href: string;
  icon: React.ReactNode;
};
const Item: FC<ItemProps> = ({ href, icon, children }) => {
  return (
    <Link href={href}>
      <a className="my-1 py-3 w-56 lg:w-72 flex items-center hover:bg-gray-100 rounded pl-2 text-sm font-medium text-black">
        <span className="hidden lg:block">{icon}</span>
        <div className="block pl-2">
          {children}
          <p className="text-sm font-light">Test</p>
        </div>
      </a>
    </Link>
  );
};

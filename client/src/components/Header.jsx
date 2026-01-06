import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { LayoutDashboard, PenBox, BookText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const Header = () => {
  const [navItemIndex, setNavItemIndex] = useState(0);

  const items = [
    {
      title: "Dashboard",
      url: "/home",
      icon: LayoutDashboard,
    },
    {
      title: "Study Log",
      url: "/study-log",
      icon: BookText,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: PenBox,
    },
  ];
  return (
    <div
      className="w-40 relative border-r-[1px]  border-zinc-100 shadow-2xl"
      style={{
        background:
          "linear-gradient(180deg, #fffaf3 0%, #fffdf9 40%, #ffffff 100%)",
      }}
    >
      <SignedOut>
        <SignInButton forceRedirectUrl={"/notes"} signInUrl="/signin">
          <Button>Login</Button>
        </SignInButton>
      </SignedOut>
      <div className="flex p-3 flex-col gap-3 items-start justify-start">
        <Sidebar
          className="w-64 border-r border-zinc-100"
          style={{
            background:
              "linear-gradient(180deg, #fffaf3 0%, #fffdf9 40%, #ffffff 100%)",
          }}
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <h1 className="text-zinc-800 font-extrabold tracking-tighter text-[2.5rem]">
                  Kairo
                </h1>
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-10">
                <SidebarMenu>
                  {items.map((item, ind) => (
                    <SidebarMenuItem
                      onClick={() => setNavItemIndex(ind)}
                      className={`rounded-md ${
                        ind === navItemIndex
                          ? "bg-zinc-200/70 text-zinc-700"
                          : ""
                      }`}
                      key={item.title}
                    >
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span
                            className={`${
                              ind === navItemIndex
                                ? " text-zinc-900 font-medium"
                                : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
      <div className="absolute top-3 left-[116rem]">
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "40px",
                height: "40px",
              },
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
};

export default Header;

// Layout.jsx
import React from "react";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  const [showHeader, setShowHeader] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname === "/" || loc.pathname === '/signin' || loc.pathname === '/notes') setShowHeader(false);
    else if ( loc.pathname === '/home' || loc.pathname === '/study-log') setShowHeader(true);
  }, [showHeader, loc, loc.pathname]);
  return (
    <div className="w-full max-h-screen">
      <div className="w-full flex justify-between">

      {showHeader && <Header />}
      <main className="w-[100%]">{children}</main>
      {/* <main className="w-[86.6%]">{children}</main> */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

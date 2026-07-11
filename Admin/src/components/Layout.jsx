import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar open={open} setOpen={setOpen} />

      <Navbar setOpen={setOpen} />

      <main
        className="
        pt-20 
        px-4 
        pb-6 
        lg:ml-64 
        sm:px-6 
        lg:px-8
        "
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;

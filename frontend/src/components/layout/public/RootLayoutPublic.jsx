import Navbar from "./Navbar";
import Sidebar from "../Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function RootLayoutPublic() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div
      // className={`${theme === "winter" ? "bg-[#F1F5F9]" : null}`}
      >
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <h1>Sidebar</h1> */}
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto min-h-screen max-w-screen-2xl font-notosanslao md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>

            <Footer />
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </>
  );
}

export default RootLayoutPublic;

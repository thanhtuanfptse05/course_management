import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <>
      <Header />

      <NavigationBar />

      <div className="container mt-4">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default MainLayout;

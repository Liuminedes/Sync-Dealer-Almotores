import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Aquí puedes meter navbar, sidebar, etc. */}
      <Outlet />
    </div>
  );
};

export default MainLayout;

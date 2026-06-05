import { Navbar } from "@/components/Navbar";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

export const MainLayout = ({ children, showRight = true }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_320px]">
        <LeftSidebar />
        <main className="min-w-0">{children}</main>
        {showRight && <RightSidebar />}
      </div>
    </div>
  );
};

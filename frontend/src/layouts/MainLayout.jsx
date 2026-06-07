import { Navbar } from "@/components/Navbar";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

export const MainLayout = ({ children, right, showRight = true }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Full-width container — no artificial max-w cap on the grid itself */}
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6">
        <div
          className={`flex w-full gap-5 ${
            showRight ? "lg:grid lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_280px]" : "lg:grid lg:grid-cols-[240px_1fr]"
          }`}
        >
          <LeftSidebar />
          <main className="min-w-0 flex-1">{children}</main>
          {showRight && (right || <RightSidebar />)}
        </div>
      </div>
    </div>
  );
};

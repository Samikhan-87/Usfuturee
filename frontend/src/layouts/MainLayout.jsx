import { Navbar } from "@/components/Navbar";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

export const MainLayout = ({ children, right, showRight = true }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div
        className={`mx-auto flex w-full max-w-[1600px] gap-6 px-4 py-6 lg:px-6 ${
          showRight ? "" : ""
        }`}
      >
        {/* Left sidebar — fixed 240px */}
        <aside className="hidden shrink-0 lg:block lg:w-[240px]">
          <LeftSidebar />
        </aside>

        {/* Center content — stretches to fill all remaining space */}
        <main className="min-w-0 flex-1">{children}</main>

        {/* Right sidebar — fixed 280px (only when showRight) */}
        {showRight && (
          <aside className="hidden shrink-0 xl:block xl:w-[280px]">
            {right || <RightSidebar />}
          </aside>
        )}
      </div>
    </div>
  );
};

import { useAuth } from "@/hooks/useAuth";
import StudentPortal from "@/pages/StudentPortal";
import TeacherPortal from "@/pages/TeacherPortal";
import PrincipalPortal from "@/pages/PrincipalPortal";
import { MainLayout } from "@/layouts/MainLayout";

export default function Portal() {
  const { role } = useAuth();
  if (role === "student") return <StudentPortal />;
  if (role === "teacher") return <TeacherPortal />;
  if (role === "principal") return <PrincipalPortal />;
  return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center text-center" data-testid="portal-no-access">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">No portal available</h1>
          <p className="mt-2 text-muted-foreground">Portals are available for students, teachers, and principals.</p>
        </div>
      </div>
    </MainLayout>
  );
}

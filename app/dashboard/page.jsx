import DashboardClientPage from './DashboardClientPage';

export const metadata = {
  title: "Student Dashboard | PrepSumit",
  description: "View your course progress, XP points, study goals, and certification progress on your student dashboard.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function DashboardPage() {
  return <DashboardClientPage />;
}

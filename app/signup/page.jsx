import SignupClientPage from './SignupClientPage';

export const metadata = {
  title: "Create Your Account | PrepSumit",
  description: "Sign up for an account on PrepSumit to start preparing for exams and tracking your progress.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function SignupPage() {
  return <SignupClientPage />;
}

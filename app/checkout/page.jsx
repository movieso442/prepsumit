import CheckoutClientPage from './CheckoutClientPage';

export const metadata = {
  title: "Secure Checkout | PrepSumit",
  description: "Complete your study plan registration securely on PrepSumit.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function CheckoutPage() {
  return <CheckoutClientPage />;
}

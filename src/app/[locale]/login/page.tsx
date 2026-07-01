import { redirect } from 'next/navigation';

export const metadata = {
  title: "ورود | زیمو",
  robots: { index: false },
};

export default function LoginPage() {
  redirect('https://zimo.beauty/login');
}

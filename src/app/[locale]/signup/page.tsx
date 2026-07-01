import { redirect } from 'next/navigation';

export const metadata = {
  title: "ثبت‌نام | زیمو",
  robots: { index: false },
};

export default function SignupPage() {
  redirect('https://zimo.beauty/signup');
}

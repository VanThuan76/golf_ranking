import Image from 'next/image';
import { Inter } from 'next/font/google';
import Login from 'src/shared/modules/auth/login';
import LayoutWebsite from 'src/shared/layouts/LayoutWebsite';

const inter = Inter({ subsets: ['latin'] });

export function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Login></Login>
    </main>
  );
}
Home.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Home;

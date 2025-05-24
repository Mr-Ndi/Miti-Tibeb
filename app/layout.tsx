import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import SocialSharing from '@/components/SocialSharing';

export const metadata = {
  title: 'Miti Tibeb',
  description: 'Art of Trees',
  icons: {
    icon: '/icon2.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SocialSharing
          productId="123"
          productName="Product Name"
          productUrl="https://your-site.com/products/123"
        />
      </body>
    </html>
  );
}

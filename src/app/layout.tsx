import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import MenuNav from '../components/MenuNav'; // Remove MenuNav

export const metadata = {
  title: 'Wingz Impex | Food & Beverage Trading',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <MenuNav /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}

import Navbar from "@/components/Navbar";
import "./global.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Flexibble",
  description: "big project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

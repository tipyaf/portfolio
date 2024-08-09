import { Manrope } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/nav-bar/NavBar";

const manrope = Manrope({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
      <NavBar />
      {children}
      </body>
    </html>
  );
}

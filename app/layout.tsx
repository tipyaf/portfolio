import type {Metadata} from "next";
import {Noto_Sans_Javanese} from "next/font/google";
import "./globals.css";

interface RootLayoutProps {
    children: React.ReactNode;
}

const noto = Noto_Sans_Javanese({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Yannick Benchimol",
    description: "Experienced front-end developer with 8 years in Angular, Vue.js, React, Nuxt.js, Next.js, and Node.js. Explore my portfolio to see innovative projects and high-performance web solutions tailored to your needs.",
};

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
        <body className={noto.className}>{children}</body>
        </html>
    );
}

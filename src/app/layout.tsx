import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getGlobalPageData, getGlobalPageMetadata } from "@/data/loadersData";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.title,
    description: metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalPageData();
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header data={globalData.header}></Header>
        <div>{children}</div>
        <Footer data={globalData.footer}></Footer>
      </body>
    </html>
  );
}

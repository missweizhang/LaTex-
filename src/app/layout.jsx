import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LaTex 生字注音",
  description: "用Overleaf给生字标注汉语拼音",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-slate-300 text-slate-600 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}

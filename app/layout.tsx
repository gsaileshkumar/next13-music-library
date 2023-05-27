import Link from "next/link";
import "./global.css";

export const metadata = {
  title: "Fun FM",
  description: "Music Library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className=" bg-slate-400 ">
        <header className="flex items-center justify-center h-20 bg-slate-600">
          <Link href="/" className="text-3xl font-medium text-slate-300">
            Music Library
          </Link>
        </header>
        <div className="container mx-auto px-5 py-2">
          <div className="flex flex-col gap-2">{children}</div>
        </div>
      </body>
    </html>
  );
}

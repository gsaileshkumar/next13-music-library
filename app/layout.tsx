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
        <header className="container mx-auto px-5 py-2">
          <Link href="/">
            <h1 className="text-3xl font-bold">FunFM Music Library</h1>
          </Link>
        </header>
        <div className="container mx-auto px-5 py-2">
          <div className="flex flex-col gap-2">{children}</div>
        </div>
      </body>
    </html>
  );
}

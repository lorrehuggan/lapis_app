import Menu from "@/components/app/menu";
import Options from "@/components/app/options";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lapis | App",
  description: "Note-taking for the modern age",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-12 h-dvh overflow-hidden">
      <Menu />
      {children}
      <Options />
    </main>
  );
}

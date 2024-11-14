import type { Metadata } from "next";
import { Header } from "@/components/shared/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza",
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <main
      className="min-h-screen"
    >
      <Suspense>
        <Header />
      </Suspense>
      {modal}
      {children}
    </main>
  );
}

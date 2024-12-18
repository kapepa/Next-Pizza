import { Container } from "@/components/shared/container"
import { Header } from "@/components/shared/header"
import { Metadata } from "next"
import { ReactNode, Suspense } from "react"

interface CheckoutLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Pizza | Cart",
  description: "",
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <main
      className="min-h-screen bg-[#F4F1EE]"
    >
      <Suspense>
        <Header
          hasCart={false}
          hasSearch={false}
          className="border-gray-200"
        />
      </Suspense>
      <Container>
        {children}
      </Container>
    </main>
  )
}
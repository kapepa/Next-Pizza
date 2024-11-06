"use client"

import { FC, PropsWithChildren, ReactNode } from "react";
import { Toaster } from "../ui/toaster";
import { SessionProvider } from "next-auth/react"
import NextTopLoader from 'nextjs-toploader';

const Providers: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <NextTopLoader />
      <SessionProvider>
        {children}
      </SessionProvider>
      <Toaster />
    </>
  )
}

export { Providers }
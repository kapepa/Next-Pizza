"use client"

import { FC, PropsWithChildren } from "react";
import { Toaster } from "../ui/toaster";
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from "next-auth/react"

const Providers: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
      <NextTopLoader
        showSpinner={false}
      />
      <Toaster />
    </>
  )
}

export { Providers }
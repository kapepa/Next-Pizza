"use client"

import { cn } from "@/lib/utils";
import React, { FC, useEffect } from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from 'lucide-react';
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  hasCart?: boolean,
  hasSearch?: boolean,
  className?: string
}

const Header: FC<HeaderProps> = (props) => {
  const { hasCart = true, hasSearch = true, className } = props;
  const searchParams = useSearchParams();
  const { toast } = useToast()

  useEffect(() => {
    if (searchParams.has("paid")) toast({ title: "The order was successfull paid" });
  }, [searchParams])

  return (
    <header
      className={cn(
        "border",
        className
      )}
    >
      <Container
        className="flex items-center justify-between py-8"
      >
        <Link
          href="/"
        >
          <div
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={35}
              height={35}
            />
            <div>
              <h1
                className="text-2xl uppercase font-black"
              >
                Next Pizza
              </h1>
              <p
                className="text-sm text-gray-400 leading-3"
              >
                Вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {
          hasSearch && (
            <div
              className="10 flex-1"
            >
              <SearchInput />
            </div>
          )
        }

        <div
          className="flex items-center gap-3"
        >
          <Button
            variant="outline"
            className="flex items-center gap-3"
          >
            <User
              size={16}
            />
            Sign in
          </Button>
          {
            hasCart && (
              <div>
                <CartButton />
              </div>
            )
          }
        </div>
      </Container>
    </header>
  )
}

export { Header }
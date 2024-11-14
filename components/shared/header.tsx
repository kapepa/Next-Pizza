"use client"

import { cn } from "@/lib/utils";
import React, { FC, useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal/auth-modal";

interface HeaderProps {
  hasCart?: boolean,
  hasSearch?: boolean,
  className?: string
}

const Header: FC<HeaderProps> = (props) => {
  const { hasCart = true, hasSearch = true, className } = props;
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  useEffect(() => {
    const quiryTimeout = setTimeout(() => {
      if (searchParams.has("paid")) toast({ title: "The order was successfull paid" });
      if (searchParams.has("verified")) toast({ title: "The email was successfull comfirmed" });
    }, 0)

    return () => clearTimeout(quiryTimeout);
  }, [toast, searchParams]);

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
          <AuthModal
            open={openAuthModal}
            onClose={function (): void {
              setOpenAuthModal(false);
            }}
          />
          <ProfileButton
            onClickSignIn={() => setOpenAuthModal(true)}
          />
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
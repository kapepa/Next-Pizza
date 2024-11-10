"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

type TypeOfModal = "login" | "register";

interface AuthModalProps {
  open: boolean,
  onClose: () => void,
}

const AuthModal: FC<AuthModalProps> = (props) => {
  const { open, onClose } = props;
  const [typeModal, setTyoeModal] = useState<TypeOfModal>("login");

  const onSwitchType = () => {
    setTyoeModal(type => type === "login" ? "register" : "login");
  }

  const handlerClose = () => {
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handlerClose}
    >
      <DialogContent
        className="w-[450px] bg-white p-10"
      >
        <DialogHeader>
          <DialogTitle
            className="none"
          />
          {
            typeModal === "login"
              ? (
                <LoginForm
                  onClose={onClose}
                />
              )
              : (
                <RegisterForm
                  onClose={onClose}
                />
              )
          }
          <hr />
        </DialogHeader>

        <div
          className="flex gap-2"
        >
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              signIn(
                "github",
                {
                  redirect: true,
                  callbackUrl: "/"
                }
              )
            }}
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              className="w-6 h-6"
            />
            GitHub
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              signIn(
                "google",
                {
                  redirect: true,
                  callbackUrl: "/"
                }
              )
            }}
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onSwitchType}
            className="h-12 w-full"
          >
            {typeModal === "login" ? "Sign up" : "Sign in"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AuthModal }
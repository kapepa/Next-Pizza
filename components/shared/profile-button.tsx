import { FC } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProfileButtonProps {
  className?: string,
  onClickSignIn?: () => void,
}

const ProfileButton: FC<ProfileButtonProps> = (props) => {
  const { className, onClickSignIn } = props;
  const { data } = useSession();

  if (!data) return (
    <Button
      variant="outline"
      className={cn(
        "flex items-center gap-3",
        className,
      )}
      onClick={onClickSignIn}
    >
      <User
        size={16}
      />
      Sign in
    </Button>
  )

  return (
    <Link
      href="/profile"
    >
      <Button
        variant="secondary"
        className={cn(
          "flex items-center gap-2",
          className,
        )}
      >
        <CircleUser
          size={18}
        />
        Profile
      </Button>
    </Link>
  )
}

export { ProfileButton }
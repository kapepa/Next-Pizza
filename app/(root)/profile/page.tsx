import { ProfileForm } from "@/components/shared/profile-form";
import prisma from "@/db";
import { getUserSession } from "@/lib/get-user-session";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const ProfilePage: NextPage = async () => {
  const session = await getUserSession();
  if (!session) return redirect("/not-auth");

  const user = await prisma.user.findFirst({
    where: {
      id: session.id
    }
  });

  if (!user) return redirect("/not-auth");

  return (
    <ProfileForm
      data={user}
    />
  )
}

export default ProfilePage;
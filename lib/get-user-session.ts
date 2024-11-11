import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"

const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
}

export { getUserSession };
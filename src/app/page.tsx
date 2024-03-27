import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title:
    "Streamline Your Workflow with Biztreck - The Ultimate Project Automation Solution",
  description: "Enhance productivity and efficiency with Biztreck, the premier project automation tool. Simplify complex tasks, automate repetitive processes, and maximize team collaboration effortlessly. Try Biztreck today for seamless project management and accelerated growth.",
};
export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  } else {
    const user = session.user; // Extract user object from session
    
    if ((user as { role?: string }).role === "Admin") {
      console.log("admin page")
    } else {
      console.log(user); // Ensure the user object has the 'role' property
    }
  }


  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/custom/sidebar";
import { Search } from "@/components/custom/search";
import { UserNav } from "@/components/custom/user-nav";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assiduus",
  description: "Analytics Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Image
              alt="Logo Image"
              src={"/images/logo-main.png"}
              width={200}
              height={200}
            />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <IoMdNotifications className="cursor-pointer" size={20} />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5">
          <Sidebar className="col-span-1" />
          <div className="hidden xl:block col-span-4 ">{children}</div>
          <div className="col-span-1  xl:hidden h-44 text-center flex justify-center items-center border-4 border-spacing-5 border-dotted">
            Data not visible for smaller screens.<br/> Please open in a larger screen
          </div>
        </div>
      </body>
    </html>
  );
}

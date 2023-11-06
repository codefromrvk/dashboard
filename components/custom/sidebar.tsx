import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAccountBalanceWallet,MdContacts } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button  className="w-full justify-start">
              <BiSolidDashboard size={20} className="mr-6" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MdAccountBalanceWallet size={20} className="mr-6" />
              Accounts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FaDollarSign size={20} className="mr-6" />
              Payroll
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HiDocumentText size={20} className="mr-6" />
              Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BsPersonFill size={20} className="mr-6" />
              Advisors
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MdContacts size={20} className="mr-6" />
              Contacts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

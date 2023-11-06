"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  account: string;
  thisMonth: string;
  ytd: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "thisMonth",
    header: "This Month",
  },
  {
    accessorKey: "ytd",
    header: "YTD",
  },
];

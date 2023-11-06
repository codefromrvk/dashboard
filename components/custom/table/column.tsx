"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataTableType = {
  id: string;
  account: string;
  thisMonth: string;
  ytd: string;
};

export const columns: ColumnDef<DataTableType>[] = [
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

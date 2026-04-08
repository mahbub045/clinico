"use client";

import {
  Edit,
  Eye,
  Plus,
  SearchIcon,
  ShieldCheck,
  Trash,
  User,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ReceptionistRecord = {
  alias: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  status: "Online" | "Offline" | "Pending";
};

const receptionists: ReceptionistRecord[] = [
  {
    alias: "jane-doe",
    name: "Jane Doe",
    email: "jane.doe@clinico.com",
    phone: "+1 (555) 123-9876",
    branch: "Main Clinic",
    status: "Online",
  },
  {
    alias: "michael-ross",
    name: "Michael Ross",
    email: "michael.ross@clinico.com",
    phone: "+1 (555) 214-7890",
    branch: "Uptown Desk",
    status: "Offline",
  },
  {
    alias: "eyni-sanchez",
    name: "Eyni Sanchez",
    email: "eyni.sanchez@clinico.com",
    phone: "+1 (555) 654-3210",
    branch: "East Wing",
    status: "Pending",
  },
];

const ReceptionistList: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredReceptionists = useMemo(
    () =>
      receptionists.filter((item) =>
        [item.name, item.email, item.branch]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="card bg-card border-border/70 space-y-8 rounded-3xl border p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
            Receptionist directory
          </p>
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            Manage reception staff
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm leading-6">
            Search the front desk team, review contact details, and keep
            receptionist profiles up to date.
          </p>
        </div>

        <div className="grid w-full max-w-sm gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative w-full">
            <SearchIcon className="text-primary pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="receptionist-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search receptionists..."
              className="w-full pl-10"
            />
          </div>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus />
            Add receptionist
          </Button>
        </div>
      </div>

      <Table className="bg-card w-full border text-sm shadow-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary">Name</TableHead>
            <TableHead className="text-primary">Email</TableHead>
            <TableHead className="text-primary">Phone</TableHead>
            <TableHead className="text-primary">Branch</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReceptionists.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-muted-foreground py-10 text-center"
              >
                No receptionists match your search. Try another keyword.
              </TableCell>
            </TableRow>
          ) : (
            filteredReceptionists.map((receptionist) => (
              <TableRow key={receptionist.alias}>
                <TableCell className="text-foreground font-medium">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary/10 text-primary inline-flex h-9 w-9 items-center justify-center rounded-2xl">
                      <User className="h-4 w-4" />
                    </span>
                    <div className="space-y-0.5">
                      <Link
                        href={`/dashboard/admin/receptionists/${receptionist.alias}`}
                        className="text-primary hover:underline"
                      >
                        {receptionist.name}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{receptionist.email}</TableCell>
                <TableCell>{receptionist.phone}</TableCell>
                <TableCell>{receptionist.branch}</TableCell>
                <TableCell>
                  <span className="border-border/70 text-foreground inline-flex items-center gap-2 rounded-full border bg-white/95 px-3 py-1 text-xs font-medium shadow-sm shadow-slate-950/5 dark:bg-slate-950/90 dark:text-slate-200">
                    <ShieldCheck className="text-primary h-3.5 w-3.5" />
                    {receptionist.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center justify-end gap-2">
                    <Button asChild size="sm" variant="default">
                      <Link
                        href={`/dashboard/admin/receptionists/${receptionist.alias}`}
                      >
                        <Eye />
                      </Link>
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Edit />
                    </Button>
                    <Button size="sm" variant="danger">
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReceptionistList;

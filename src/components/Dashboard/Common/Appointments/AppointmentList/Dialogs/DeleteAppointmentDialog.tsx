"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteAppointmentMutation } from "@/redux/reducers/Common/Appointments/AppointmentsApi";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteAppointmentDialogProps {
  alias?: string | null;
  appointmentLabel?: string | null;
  children?: React.ReactNode;
}

const DeleteAppointmentDialog: React.FC<DeleteAppointmentDialogProps> = ({
  alias,
  appointmentLabel,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteAppointment, { isLoading }] = useDeleteAppointmentMutation();

  const handleDelete = async () => {
    if (!alias) {
      toast.error(
        "Unable to delete appointment. Missing appointment identifier.",
      );
      return;
    }

    try {
      await deleteAppointment(alias).unwrap();
      toast.success("Appointment deleted successfully.");
      setOpen(false);
    } catch (error) {
      toast.error("Unable to delete appointment. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="danger" size="sm">
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete appointment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {appointmentLabel ?? "this appointment"}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAppointmentDialog;

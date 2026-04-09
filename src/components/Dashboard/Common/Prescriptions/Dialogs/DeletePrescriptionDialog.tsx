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
import { useDeletePrescriptionMutation } from "@/redux/reducers/Common/Prescriptions/PrescriptionsApi";
import { DeletePrescriptionDialogProps } from "@/types/Common/Prescriptions/PrescriptionsType";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const DeletePrescriptionDialog: React.FC<DeletePrescriptionDialogProps> = ({
  alias,
  prescriptionLabel,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [deletePrescription, { isLoading }] = useDeletePrescriptionMutation();

  const handleDelete = async () => {
    if (!alias) {
      toast.error("Unable to delete prescription. Missing identifier.");
      return;
    }

    try {
      await deletePrescription(alias).unwrap();
      toast.success("Prescription deleted successfully.");
      setOpen(false);
    } catch (error) {
      toast.error("Unable to delete prescription. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="danger" size="sm">
            <Trash />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete prescription?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {prescriptionLabel ?? "this prescription"}? This action cannot be
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
            {isLoading ? "Deleting..." : "Delete prescription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePrescriptionDialog;

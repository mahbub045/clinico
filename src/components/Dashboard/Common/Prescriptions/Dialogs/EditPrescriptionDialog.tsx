"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditPrescriptionMutation } from "@/redux/reducers/Common/Prescriptions/PrescriptionsApi";
import { EditPrescriptionDialogProps } from "@/types/Common/Prescriptions/PrescriptionsType";

const buildFormState = (
  values: EditPrescriptionDialogProps["initialValues"],
) => ({
  prescription_number: values.prescription_number ?? "",
  diagnosis: values.diagnosis ?? "",
  medicines: values.medicines ?? "",
  advice: values.advice ?? "",
  notes: values.notes ?? "",
});

const EditPrescriptionDialog: React.FC<EditPrescriptionDialogProps> = ({
  alias,
  initialValues,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(buildFormState(initialValues));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [editPrescription, { isLoading }] = useEditPrescriptionMutation();

  const resetForm = () => {
    setFormData(buildFormState(initialValues));
    setFieldErrors({});
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      resetForm();
    }
    setOpen(nextOpen);
  };

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const renderFieldError = (field: keyof typeof formData) =>
    fieldErrors[field]?.map((error, idx) => (
      <p key={idx} className="text-destructive text-xs">
        {error}
      </p>
    ));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    if (!formData.diagnosis || !formData.medicines) {
      setFieldErrors({
        diagnosis: formData.diagnosis ? [] : ["Diagnosis is required"],
        medicines: formData.medicines ? [] : ["Medicines are required"],
      });
      return;
    }

    try {
      await editPrescription({ alias, data: formData }).unwrap();
      toast.success("Prescription updated successfully.");
      setOpen(false);
    } catch (error) {
      toast.error("Unable to update prescription. Please try again.");
      console.error(error);

      const apiErrors =
        error && typeof error === "object" && "data" in error
          ? (error as { data?: unknown }).data
          : null;

      if (apiErrors && typeof apiErrors === "object") {
        const parsedErrors = Object.entries(apiErrors).reduce(
          (acc, [key, value]) => {
            if (Array.isArray(value)) {
              acc[key] = value.map((item) => String(item));
            } else if (value != null) {
              acc[key] = [String(value)];
            }
            return acc;
          },
          {} as Record<string, string[]>,
        );

        if (Object.keys(parsedErrors).length > 0) {
          setFieldErrors(parsedErrors);
          toast.error("Please fix the highlighted fields.");
          return;
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="secondary" size="sm">
            <Edit />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-xl! overflow-y-auto shadow-md sm:max-w-2xl! md:max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Edit prescription</DialogTitle>
          <DialogDescription>
            Update prescription details and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="prescription_number"
            >
              Prescription number
            </label>
            <Input
              id="prescription_number"
              value={formData.prescription_number}
              disabled
              readOnly
              className="bg-muted-foreground/10 text-foreground"
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="diagnosis"
            >
              Diagnosis
            </label>
            <Input
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(event) =>
                handleInputChange("diagnosis", event.target.value)
              }
              placeholder="Enter diagnosis"
            />
            {renderFieldError("diagnosis")}
          </div>

          <div className="grid gap-2">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="medicines"
            >
              Medicines
            </label>
            <Textarea
              id="medicines"
              value={formData.medicines}
              onChange={(event) =>
                handleInputChange("medicines", event.target.value)
              }
              placeholder="List medicines and instructions"
              rows={4}
            />
            {renderFieldError("medicines")}
          </div>

          <div className="grid gap-2">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="advice"
            >
              Advice
            </label>
            <Textarea
              id="advice"
              value={formData.advice}
              onChange={(event) =>
                handleInputChange("advice", event.target.value)
              }
              placeholder="Add advice for the patient"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="notes"
            >
              Notes
            </label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(event) =>
                handleInputChange("notes", event.target.value)
              }
              placeholder="Any internal notes"
              rows={3}
            />
          </div>

          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="ghost" size="sm" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button size="sm" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPrescriptionDialog;

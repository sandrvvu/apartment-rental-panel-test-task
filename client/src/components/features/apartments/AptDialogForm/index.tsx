import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { Apartment } from "@/lib/types";
import { AptForm } from "../AptForm";
import { Dispatch } from "react";

type AptDialogFormProps = {
  apt?: Apartment;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export function AptDialogForm({ apt, isOpen, setIsOpen }: AptDialogFormProps) {
  const isUpdate = !!apt;

  const dialogTitle = isUpdate ? "Edit Apartment" : "New Apartment";
  const dialogDescription = isUpdate
    ? "Make changes to your apartment listing here."
    : "Enter the details for your new apartment listing below.";
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="shadow-md hover:shadow-lg">
            {isUpdate ? "Edit" : "Add new"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <AptForm apt={apt} setIsOpen={setIsOpen} />
        </DialogContent>
      </form>
    </Dialog>
  );
}

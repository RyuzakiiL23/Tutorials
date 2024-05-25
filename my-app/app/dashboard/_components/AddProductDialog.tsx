import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddProductDialog() {
  return (
    <div className="m-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add Product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Your Product</DialogTitle>
          </DialogHeader>

          
          <div className="flex gap-4">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="button">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import ImageUploader from "./ImageUploader";

export default function AddProductDialog() {
  return (
    <div className="m-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add Product</Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>Add Your Product</DialogTitle>
          </DialogHeader>
          <div className="w-screen">
            <ImageUploader />

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

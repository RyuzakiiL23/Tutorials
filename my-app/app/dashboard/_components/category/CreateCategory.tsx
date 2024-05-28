"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/actions/categoryAction";

export default function CreateCategory(props: any) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ New Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>
            Add a new category to your store
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (FormData) => {
            const response = await createCategory(FormData);
            if (response.message === "category created successfully") {
              setOpen(false);
              props.setCategoryLength(-1);
              setError("");
            } else {
              setError(response.message);
            }
            console.log(response);
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="Category"
                className="col-span-3"
              />
            </div>
            <p className={error !== '' ? 'text-destructive text-center w-full' : 'hidden' }>{error}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

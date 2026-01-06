import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { toast } from "sonner";

const AddReminderDialog = ({ onAdd }) => {
  const [reminderText, setReminderText] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reminderText || !date) {
      toast.error("Both fields are required!");
      return;
    }

    const newReminder = { text: reminderText, date };
    onAdd(newReminder);

    toast.success("Reminder added!");
    setReminderText("");
    setDate("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Reminder</Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add New Reminder</DialogTitle>
          <DialogDescription>Fill in the reminder and select a date</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Reminder description"
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            required
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <Button type="submit" variant="secondary">
            Save Reminder
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderDialog;

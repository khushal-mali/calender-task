import { Event, Events } from "@/App";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const eventFormVal = z.object({
  name: z.string().min(3).max(40),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().min(3).max(150),
});

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  events: Events;
  setEvents: React.Dispatch<React.SetStateAction<Events>>;
}

const Modal = ({
  modalOpen,
  setModalOpen,
  selectedDate,
  events,
  setEvents,
}: ModalProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [eventForm, setEventForm] = useState<Event>({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  console.log(errors);

  const handleEventSubmit = async () => {
    if (!selectedDate) return;

    try {
      await eventFormVal.parseAsync(eventForm);
      const dateKey = formatDate(selectedDate)!; // DD-MM-YYYY

      const newStart = new Date(`1970-01-01T${eventForm.startTime}:00`);
      const newEnd = new Date(`1970-01-01T${eventForm.endTime}:00`);

      // Check if the end time is after the start time
      if (newEnd <= newStart) {
        toast.error("End time must be after start time.");
        return;
      }

      const newEvents = { ...events };
      if (!newEvents[dateKey]) newEvents[dateKey] = [];

      // Only check events on the selected date
      const eventsOnSelectedDate = newEvents[dateKey];

      // Check for overlapping times
      const isOverlap = eventsOnSelectedDate.some((event) => {
        const existingStart = new Date(`1970-01-01T${event.startTime}:00`);
        const existingEnd = new Date(`1970-01-01T${event.endTime}:00`);
        return (
          (newStart >= existingStart && newStart < existingEnd) || // New start overlaps existing
          (newEnd > existingStart && newEnd <= existingEnd) || // New end overlaps existing
          (newStart <= existingStart && newEnd >= existingEnd) // New fully covers existing
        );
      });

      if (isOverlap) {
        toast.error(
          "This time slot overlaps with an existing event on the selected date. Please choose another time."
        );
        return;
      }

      // Add the new event
      eventsOnSelectedDate.push(eventForm);
      newEvents[dateKey] = eventsOnSelectedDate;
      setEvents(newEvents);

      console.log(eventForm);

      // Reset form and close modal
      setEventForm({ name: "", startTime: "", endTime: "", description: "" });
      setModalOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");
      }

      console.log(error);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event {formatDate(selectedDate)}</DialogTitle>
          <DialogDescription>
            Fill out the details for your event below. Click "Save" to confirm
            your changes.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Event Name"
          value={eventForm.name}
          onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <Input
          type="time"
          placeholder="Start Time"
          value={eventForm.startTime}
          onChange={(e) =>
            setEventForm({ ...eventForm, startTime: e.target.value })
          }
        />
        {errors.startTime && (
          <p className="text-red-500 text-sm">{errors.startTime}</p>
        )}

        <Input
          type="time"
          placeholder="End Time"
          value={eventForm.endTime}
          onChange={(e) =>
            setEventForm({ ...eventForm, endTime: e.target.value })
          }
        />
        {errors.endTime && (
          <p className="text-red-500 text-sm">{errors.endTime}</p>
        )}

        <Textarea
          placeholder="Description"
          value={eventForm.description}
          onChange={(e) =>
            setEventForm({ ...eventForm, description: e.target.value })
          }
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEventSubmit} variant="default">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

import { formatDate } from "@/lib/utils";
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
import { useState } from "react";
import { Event, Events } from "@/App";

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
  const [eventForm, setEventForm] = useState<Event>({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleEventSubmit = () => {
    if (!selectedDate) return;

    const dateKey = formatDate(selectedDate)!;
    const newEvents = { ...events };
    if (!newEvents[dateKey]) newEvents[dateKey] = [];
    newEvents[dateKey].push(eventForm);

    setEvents(newEvents);
    setEventForm({ name: "", startTime: "", endTime: "", description: "" });
    setModalOpen(false);
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
        <Input
          type="time"
          placeholder="Start Time"
          value={eventForm.startTime}
          onChange={(e) =>
            setEventForm({ ...eventForm, startTime: e.target.value })
          }
        />
        <Input
          type="time"
          placeholder="End Time"
          value={eventForm.endTime}
          onChange={(e) =>
            setEventForm({ ...eventForm, endTime: e.target.value })
          }
        />
        <Textarea
          placeholder="Description"
          value={eventForm.description}
          onChange={(e) =>
            setEventForm({ ...eventForm, description: e.target.value })
          }
        />
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

import React, { useState, useEffect } from "react";
// import { Modal, Button, Input, Textarea } from "shadcn";
import "./App.css"; // Tailwind styles
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { formatDate } from "./lib/utils";

type Event = {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
};

type Events = {
  [key: string]: Event[];
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Utility function to get days in a month
const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Events>({}); // { "DD-MM-YYYY": [{ name, startTime, endTime, description }] }
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const [eventForm, setEventForm] = useState<Event>({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

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

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const startDay = days[0].getDay();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <header className="flex justify-between items-center mb-4">
          <Button onClick={handlePrevMonth}>Previous</Button>
          <h1 className="text-xl font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h1>
          <Button onClick={handleNextMonth}>Next</Button>
        </header>

        <div className="grid grid-cols-7 gap-2 text-center">
          {DAYS.map((day) => (
            <div key={day} className="font-medium text-gray-600">
              {day}
            </div>
          ))}

          {Array.from({ length: startDay }).map((_, idx) => (
            <div key={idx}></div>
          ))}

          {days.map((date) => {
            const dateKey = date.toISOString().split("T")[0];
            const isToday = new Date().toDateString() === date.toDateString();

            return (
              <button
                key={date.toISOString()}
                className={`p-4 border rounded-lg ${
                  isToday ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleDayClick(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="">{JSON.stringify(events)}</div>

      {modalOpen && (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Event {formatDate(selectedDate)}</DialogTitle>
              <DialogDescription>
                Fill out the details for your event below. Click "Save" to
                confirm your changes.
              </DialogDescription>
            </DialogHeader>

            <Input
              placeholder="Event Name"
              value={eventForm.name}
              onChange={(e) =>
                setEventForm({ ...eventForm, name: e.target.value })
              }
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
      )}
    </div>
  );
};

export default App;

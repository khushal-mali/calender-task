import React, { useEffect, useState } from "react";
import "./App.css";
import DateKey from "./components/date-key";
import Modal from "./components/modal";
import Sidebar from "./components/sidebar";
import { Button } from "./components/ui/button";

export type Event = {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
};

export type Events = {
  [key: string]: Event[]; // Keyed by date in "DD-MM-YYYY" format
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
  const [events, setEvents] = useState<Events>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [filterTerm, setFilterTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  // const [filteredEvents, setFilteredEvents] = useState<Events>();

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
            // const dateKey = formatDate(date)!;

            // const dayEvents = events[dateKey] || [];

            return (
              <DateKey
                date={date}
                setIsSidebarOpen={setIsSidebarOpen}
                setModalOpen={setModalOpen}
                setSelectedDate={setSelectedDate}
              />
            );
          })}
        </div>
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        events={events}
        selectedDate={selectedDate!}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Modal
        modalOpen={modalOpen}
        selectedDate={selectedDate!}
        setModalOpen={setModalOpen}
        events={events}
        setEvents={setEvents}
      />
    </div>
  );
};

export default App;

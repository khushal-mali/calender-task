import React, { useEffect, useState } from "react";
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
  const [events, setEvents] = useState<Events>(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : {};
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-gray-100 md:p-6 p-2">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-2 sm:p-6">
        <header className="flex justify-between items-center mb-4">
          <Button
            onClick={handlePrevMonth}
            className="text-xs sm:text-base md:text-lg px-2 sm:px-4 py-1 sm:py-3"
          >
            Previous
          </Button>
          <h1 className="sm:text-xl text-lg sm:font-bold font-semibold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h1>
          <Button
            className="text-xs sm:text-base md:text-lg px-2 sm:px-4 py-1 sm:py-3"
            onClick={handleNextMonth}
          >
            Next
          </Button>
        </header>

        <div className="grid grid-cols-7 gap-2 text-center">
          {DAYS.map((day, idx) => (
            <div
              key={idx}
              className="font-medium text-xs md:text-base text-gray-600"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: startDay }).map((_, idx) => (
            <div key={idx}></div>
          ))}

          {days.map((date) => {
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

      {selectedDate && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          events={events}
          selectedDate={selectedDate}
          setModalOpen={setModalOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      {selectedDate && (
        <Modal
          modalOpen={modalOpen}
          selectedDate={selectedDate}
          setModalOpen={setModalOpen}
          events={events}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

export default App;

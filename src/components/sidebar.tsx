import { Event, Events } from "@/App";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Plus, Trash2 } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  events: Events;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedDate,
  setModalOpen,
  events,
}: SidebarProps) => {
  const showThisDateEvents =
    Object.entries(events).filter(
      ([date]) => formatDate(selectedDate) === date
    )[0] || [];

  console.log(showThisDateEvents);
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>();

  console.log(showThisDateEvents);

  if (filterTerm.length > 1) {
    const currentEvents = showThisDateEvents[1].filter((e) =>
      e.name.toLowerCase().includes(filterTerm.toLowerCase())
    );

    setFilteredEvents(currentEvents);
  }

  const eventsTobeRendered = (
    filterTerm.length > 1 ? filteredEvents : showThisDateEvents[1]
  )!;

  return (
    <Sheet open={isSidebarOpen} onOpenChange={() => setIsSidebarOpen(false)}>
      <SheetContent className="w-80 xs:w-96 bg-white shadow-md border-r border-gray-200">
        <SheetHeader className="p-4 border-b border-gray-200">
          <SheetTitle className="text-2xl font-bold text-gray-800">
            Your Events
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            View all events for the selected date.
          </SheetDescription>
        </SheetHeader>

        <div className="md:p-4 p-1 space-y-4">
          <div className="md:text-lg flex items-center justify-between sm:text-start text-center md:mb-4 mb-2 font-semibold text-gray-700">
            Events on {formatDate(selectedDate)}
            <Button
              size={"sm"}
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 flex items-center text-white hover:bg-blue-600"
            >
              <Plus className="size-4" /> event
            </Button>
          </div>

          <Input
            type="text"
            placeholder="Filter events by name"
            className="w-full border rounded-md p-2 mb-4"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />

          {eventsTobeRendered?.length > 0 ? (
            <ul className="space-y-2 md:h-[420px] h-72 overflow-y-scroll">
              {eventsTobeRendered.map((event, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {event.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                  <p className="text-gray-700 flex flex-col gap-1 text-sm mt-1">
                    <span>{event.description}</span>
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2 className="size-6 hover:text-red-900 hover:bg-red-200 cursor-pointer p-1 rounded-sm justify-self-end" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium text-lg">
                              Delete the event
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No events found, Create new one.
            </p>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <Button
            onClick={() => setIsSidebarOpen(false)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;

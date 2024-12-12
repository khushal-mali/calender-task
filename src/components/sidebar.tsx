import { Events } from "@/App";
import { formatDate } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: React.SetStateAction<boolean>) => void;
  selectedDate: Date;
  events: Events;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedDate,
  events,
}: SidebarProps) => {
  return (
    <Sheet open={isSidebarOpen} onOpenChange={() => setIsSidebarOpen(false)}>
      <SheetContent className="w-80 bg-white shadow-md border-r border-gray-200">
        <SheetHeader className="p-4 border-b border-gray-200">
          <SheetTitle className="text-2xl font-bold text-gray-800">
            Your Events
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            View all events for the selected date.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 space-y-4">
          {selectedDate ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Events on {formatDate(selectedDate)}:
              </h3>
              {/* 
              <Input
                type="text"
                placeholder="Filter events by name"
                className="w-full border rounded-md p-2 mb-4"
                value={filterTerm}
                onChange={(e) => handleFilter(e.target.value)}
              /> */}

              {Object.keys(events).length > 0 ? (
                <ul className="space-y-2">
                  {Object.entries(events).map((event, index) => {
                    return (
                      <li className="" key={index}>
                        {event[0]}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No events match your search.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Select a date to view events.
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

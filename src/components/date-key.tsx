import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarPlus, PanelRightOpen, TableOfContents } from "lucide-react";

interface DateKeyProps {
  date: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateKey = ({
  date,
  setSelectedDate,
  setModalOpen,
  setIsSidebarOpen,
}: DateKeyProps) => {
  const isToday = new Date().toDateString() === date.toDateString();

  const handleAddEventModal = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleShowEventModal = (date: Date) => {
    setSelectedDate(date);
    setIsSidebarOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        key={date.toISOString()}
        className={`px-4 py-8 border rounded-lg text-left ${
          isToday ? "bg-blue-100" : "hover:bg-gray-100"
        }`}
      >
        <div className="font-bold text-lg">{date.getDate()}</div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuLabel className="flex justify-between items-center">
          Actions
          <TableOfContents className="size-4" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            handleShowEventModal(date);
          }}
          className="font-semibold cursor-pointer flex justify-between items-center"
        >
          Show Event
          <PanelRightOpen className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleAddEventModal(date)}
          className="font-semibold cursor-pointer flex justify-between items-center"
        >
          Add Event
          <CalendarPlus className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateKey;

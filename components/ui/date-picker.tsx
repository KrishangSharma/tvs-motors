"use client";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disabledDates?: (date: Date) => boolean;
}

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Pick a date",
  disablePastDates = false,
  disableFutureDates = false,
  disabledDates,
}: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Handle disabled dates logic
  const handleDisabledDates = (date: Date) => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    // Apply custom disabled function if provided
    if (disabledDates && disabledDates(date)) {
      return true;
    }

    // Disable past dates and dates within 2 days if only future dates are allowed
    if (disablePastDates && !disableFutureDates && date < twoDaysFromNow) {
      return true;
    }

    // Disable future dates if specified
    if (disableFutureDates && date > today) {
      return true;
    }

    return false;
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setIsCalendarOpen(false);
          }}
          disabled={handleDisabledDates}
        />
      </PopoverContent>
    </Popover>
  );
}

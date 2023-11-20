"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({name,dateRange,date,changeData}) {
//   const [date, setDate] = React.useState<Date>()
// console.log(date);

// console.log({date},format(new Date(date), "PPP"))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[145px]  justify-start text-left text-sm",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date!=="" && date ? format(new Date(date), "PP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
        
          mode="single"
          disabled={{ 
            before: new Date(dateRange.min), 
            after: new Date(dateRange.max)
        }}
        defaultMonth={name==="from"?new Date(dateRange.min):new Date(dateRange.max)}
          selected={new Date(date)}
          onSelect={(val)=> {
            changeData(name,val?.toLocaleDateString().split("T")[0])
            }
        }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

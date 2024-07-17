import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDaysIcon } from "lucide-react"

export default function Form() {
  return (
    <Card className="w-full max-w-md mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle>Plan your trip</CardTitle>
        <CardDescription>Enter your destination and travel date.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="destination">Destination</Label>
          <Input id="destination" placeholder="Where are you going?" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Travel Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                Pick a date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Plan Trip</Button>
      </CardFooter>
    </Card>
  )
}

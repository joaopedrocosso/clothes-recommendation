"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarDaysIcon } from "lucide-react"
import { useState } from "react"
import { FormState } from '@/types/types';
import { getClothes, getWeather } from '@/services/apiService';
import Climate from "./Climate"
import Recommendations from "./Recommendations"

export default function Form() {
  const [formState, setFormState] = useState<FormState>({
    destination: '',
    gender: '',
    date: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormState({
        ...formState,
        date: date.toLocaleDateString()
      });
    }
  };

  const handleGenderChange = (value: string) => {
    setFormState({
      ...formState,
      gender: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const weatherData = await getWeather(formState);
      const clothesData = await getClothes(formState);
      console.log('Weather Data:', weatherData);
      console.log('Clothes Data:', clothesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 lg:p-10">
      <Card className="mx-auto w-full max-w-md space-y-6">
        <CardHeader>
          <CardTitle>Plan your trip</CardTitle>
          <CardDescription>Enter your destination and travel date.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" placeholder="Where are you going?" onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup id="gender" defaultValue="male" className="flex items-center gap-4" onValueChange={handleGenderChange}>
              <Label htmlFor="gender-male" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem id="gender-male" value="male" />
                Male
              </Label>
              <Label htmlFor="gender-female" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem id="gender-female" value="female" />
                Female
              </Label>
              <Label htmlFor="gender-nonbinary" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem id="gender-nonbinary" value="nonbinary" />
                Non-Binary
              </Label>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Planning...' : 'Plan Trip'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

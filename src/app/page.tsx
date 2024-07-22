"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { FormState } from '@/types/types';
import { getClothes, getWeather } from '@/services/apiService';
import Climate from "@/components/Climate"
import Recommendations from "@/components/Recommendations"

export default function Home() {
  const [formState, setFormState] = useState<FormState>({
    destination: '',
    gender: 'male', // define o valor inicial como 'male'
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
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
      // console.log('Weather Data:', weatherData);
      // console.log('Clothes Data:', clothesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-row justify-center gap-20 w-full h-screen overflow-hidden ">
      <div className="flex items-center justify-center p-6 lg:p-10">
        <Card className="mx-auto w-full max-w-md space-y-2">
          <CardHeader>
            <CardTitle>Planeje seu Outfit</CardTitle>
            <CardDescription>Prepare-se da forma certa para o clima</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="destination">Destino</Label>
              <Input id="destination" placeholder="Where are you going?" onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gênero</Label>
              <RadioGroup value={formState.gender} className="flex items-center gap-4" onValueChange={handleGenderChange}>
                <Label htmlFor="gender-male" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id="gender-male" value="male" />
                  Masculino
                </Label>
                <Label htmlFor="gender-female" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id="gender-female" value="female" />
                  Feminino
                </Label>
                <Label htmlFor="gender-nonbinary" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem id="gender-nonbinary" value="nonbinary" />
                  Não-binário
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start w-full">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Planning...' : 'Enviar'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex items-center justify-start">
        <section className="flex flex-row min-w-2xl">
          <Climate formState={formState} loading={loading} />
          <Recommendations formState={formState} loading={loading} />
        </section>
      </div>
    </main>
  );
}

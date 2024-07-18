import React, { useEffect, useState } from 'react';
import { getWeather } from '@/services/apiService';
import { FormState } from '@/types/types';

interface ClimateProps {
    formState: FormState;
    loading: boolean;
}

const Climate: React.FC<ClimateProps> = ({ formState, loading }) => {
    const [temperature, setTemperature] = useState<string | null>(null);
    const [humidity, setHumidity] = useState<string | null>(null);
    const [wind, setWind] = useState<string | null>(null);
    const [icon, setIcon] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (loading) {
                const weather = await getWeather(formState);
                setTemperature(weather.temperature);
                setHumidity(weather.humidity);
                setWind(weather.wind);
                setIcon(weather.icon);
            }
        };
        fetchWeather();
    }, [formState, loading]);

    return temperature !== null && wind !== null && humidity !== null ? 
        <section className='shadow-custom py-6 px-8 rounded-lg bg-gradient-to-b from-[#181818] to-[#313131] flex flex-col items-center justify-center gap-6'>
            <div className='flex flex-col items-center'>
                <p className='text-white text-lg font-sm'>
                    Previsão do tempo   
                </p>
            </div>

            <div className='flex flex-col items-center'>
                {icon && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />}
                <p className='text-white font-semibold text-3xl'>
                    ~{temperature}
                </p>
            </div>

            <section className='grid grid-cols-2'>
                <div className='flex flex-col items-start'>
                    <p className='text-white font-normal text-lg'>
                        {humidity}
                    </p>
                    <p className='text-white font-normal text-sm'>
                        Humidade
                    </p>
                </div>

                <div className='flex flex-col items-start'>
                    <p className='text-white font-normal text-lg'>
                        {wind}
                    </p>
                    <p className='text-white font-normal text-sm'>
                        Vel. do Vento
                    </p>
                </div>
            </section>
        </section> 
    : null;
};

export default Climate;

import React, { useEffect, useState } from 'react';
import { getClothes } from '@/services/apiService';
import ReactMarkdown from 'react-markdown';
import { FormState } from '@/types/types';
import Image from 'next/image';

interface RecommendationsProps {
    formState: FormState;
    loading: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({ formState, loading }) => {
    const [dayText, setDayText] = useState<string>('');
    const [nightText, setNightText] = useState<string>('');
    const [accessoriesText, setAccessoriesText] = useState<string>('');

    useEffect(() => {
        const fetchClothes = async () => {
            if (loading) {
                const clothes = await getClothes(formState);
                setDayText(clothes.day);
                setNightText(clothes.night);
                setAccessoriesText(clothes.accessories);
            }
        };
        fetchClothes();
    }, [formState, loading]);

    return dayText !== null && nightText !== null && accessoriesText !== null ?
        <div className="flex flex-col gap-2 ml-4 w-80 py-2">
            {dayText && (
                <div className="flex flex-col gap-2">
                    <h1 className='font-bold text-2xl'>Roupas recomendadas</h1>
                    <div className="flex flex-row items-start gap-4">
                        <Image src="/Day.png" width={40} height={40} alt='' className='mt-2'/>
                        <div className=''>
                            <h3 className='font-bold text-xl'>Dia</h3>
                            <ReactMarkdown className='font-normal text-sm text-justify'>
                                {dayText}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}
            {nightText && (
                <div className="flex flex-row items-start gap-4">
                <Image src="/Night.png" width={40} height={40} alt='' className='mt-2'/>
                <div className=''>
                    <h3 className='font-bold text-xl'>Noite</h3>
                    <ReactMarkdown className='font-normal text-sm text-justify'>
                        {nightText}
                    </ReactMarkdown>
                </div>
            </div>
            )}
            {accessoriesText && (
                <div className="flex flex-row items-start gap-4">
                <Image src="/Acessories.png" width={40} height={40} alt='' className='mt-2'/>
                <div className=''>
                    <h3 className='font-bold text-xl'>Acessórios</h3>
                    <ReactMarkdown className='font-normal text-sm text-justify'>
                        {accessoriesText}
                    </ReactMarkdown>
                </div>
            </div>
            )}
        </div>

        : 
        <div>

        </div>
};

export default Recommendations;

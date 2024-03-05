import React from 'react';
import { useAppSelector } from '../hooks/store';
import { useQuery } from '@tanstack/react-query';
import { getReservationsByUser } from '../../services/reservations';
// import Spinner from './icons/Spinner';
import { duration } from '../../const/reservations';
import dayjs from 'dayjs';
import SkeletonReservasUser from './SkeletonReservasUser';

const Perfil: React.FC = () => {
    const user = useAppSelector(state => state.auth.user);
    const token = useAppSelector(state => state.auth.token);
    const { data, isLoading } = useQuery({
        queryKey: ['user', user],
        queryFn: async () => await getReservationsByUser(token as string),
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60
    })

    return (
        <section className='flex flex-col items-center'>
            <h1 className='text-3xl font-medium mb-5 capitalize'>{user.name} - Perfil</h1>
            <div className='flex flex-col gap-3'>
                {
                    isLoading ? <SkeletonReservasUser></SkeletonReservasUser> : 
                    <header className='grid grid-cols-4 gap-2 justify-items-center px-4'>
                        <p>Fecha</p>
                        <p>Hora</p>
                        <p>Duración</p>
                        <p>Estado</p>
                    </header>
                }
                {data?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())?.map((reservation) => {
                    const durationLabel = duration.find((d) => d.value === reservation.duration)?.label || reservation.duration
                    const isExpired = dayjs(reservation.date).isBefore(dayjs().subtract(1, 'day'))
                    return (
                    <div key={reservation.id} className={`grid grid-cols-4 gap-2 ${isExpired ? 'bg-red-300' : 'bg-green-300'}  justify-items-center  p-4 rounded-md items-center`}>
                        <p>{reservation.date}</p>
                        <p>{reservation.time.slice(0, 5)} hs</p>
                        <p>{durationLabel}</p>
                        <p>{reservation.status}</p>
                    </div>
                )})}
            </div>
        </section>
    );
};

export default Perfil
import React from 'react';
import { ResponseReservations } from '../../vite-env';
import { useQuery } from '@tanstack/react-query';
import { getReservations } from '../../services/reservations';
import dayjs from 'dayjs';
import FormReserva from './FormReserva';
import { useAppSelector } from '../hooks/store';
import SkeletonReservas from './SkeletonReservas';

const response: ResponseReservations = {
    "timeFree": {
    },
    "openingTime": []
}

const Reservas: React.FC = () => {

    const isAuth = useAppSelector(state => state.auth.isAuthenticated)

    const [date, setDate] = React.useState(dayjs().format('YYYY-MM-DD'))
    const [FormData, setFormData] = React.useState({
        date: date,
        show: false,
        canchaId: "",
        initialTime: '08:00'
    })
    const { data = response, isLoading, isError } = useQuery<ResponseReservations>(
        {
            queryKey: ['reservations', date],
            queryFn: async () => await getReservations(date),
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60
        })
    const { timeFree, openingTime } = data
    const canchas = Object.keys(timeFree)

    const addDay = () => {
        if (dayjs().add(7, 'day').isSame(dayjs(date), 'day')) return
        const newDate = dayjs(date).add(1, 'day')
        setDate(newDate.format('YYYY-MM-DD'))
    }

    const subDay = () => {
        if (dayjs(date).isSame(dayjs(), 'day')) return
        const newDate = dayjs(date).subtract(1, 'day')
        setDate(newDate.format('YYYY-MM-DD'))
    }

    const onClick = (canchaId: string, initialTime: string) => {
        setFormData({ ...FormData, date, canchaId, initialTime, show: true })
    }

    const hideModal = () => {
        setFormData({ ...FormData, show: false })
    }


    return (
        <section className='w-full flex flex-col items-center'>
            {FormData.show && isAuth && <FormReserva onCancel={hideModal} {...FormData} />}
            {/* {isLoading && <p>Cargando...</p>} */}
            {isError && <p>Error</p>}
            <div className='w-full max-w-2xl flex flex-col items-center'>
                <div className='flex gap-4 p-1 text-white bg-primary justify-around w-full border border-black'>
                    <div onClick={subDay}>{'<'}</div>
                    <p>{date}</p>
                    <div onClick={addDay}>{'>'}</div>
                </div>

                <header className='w-full flex justify-around border border-black bg-white'>
                    <div className='w-full flex justify-center outline outline-1 outline-black p-1'><p>Horarios</p></div>
                    {
                        canchas.map(cancha =>
                            <div key={cancha} className='w-full flex justify-center outline outline-1 outline-black p-1'>
                                <p>cancha {cancha}</p>
                            </div>)
                    }
                </header>
                {
                    isLoading ? <SkeletonReservas></SkeletonReservas> : null
                }
                <div className='w-full flex flex-col items-center'>
                    {
                        openingTime.map((horario, index) =>
                            <div key={horario} className='w-full flex justify-around border border-black select-none'>
                                <div className='w-full flex justify-center outline outline-1 outline-black' key={index}><p>{horario}</p></div>
                                {
                                    canchas.map(cancha =>
                                        <div key={cancha + horario} className='w-full flex justify-center'>
                                            {
                                                timeFree[Number(cancha)].includes(horario) ?
                                                    <div onClick={() => onClick(cancha, horario)} className='bg-green-500 w-full outline outline-1 outline-black'>
                                                    </div>
                                                    :
                                                    <div className='bg-gray-500 w-full outline outline-1 outline-black'>
                                                    </div>
                                            }
                                        </div>
                                    )
                                }
                            </ div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Reservas
import React from 'react';
import Modal from './Modal';
import { createReservation } from '../../services/reservations';
import { useAppSelector } from '../hooks/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseReservations } from '../../vite-env';
import { durationsEnabled, generateTimeArrayByDuration } from '../../services/pureFunctions';

const InfoForm: React.FC<{ keyValue: string, value: string }> = ({ keyValue, value }) => {
    return (
        <div className='flex gap-2 w-full'>
            <p className='w-1/2 flex font-medium text-lg'>{keyValue}</p>
            <p className='w-1/2 flex justify-start border-b border-black px-2'>{value}</p>
        </div>
    )
}

interface Props {
    date: string
    initialTime: string
    canchaId: string
    onCancel: () => void
}

const FormReserva: React.FC<Props> = ({ date, initialTime, canchaId, onCancel }) => {
    const queryClient = useQueryClient()

    const reservas = queryClient.getQueryData(['reservations', date]) as ResponseReservations
    const timesEnabled = reservas.timeFree[Number(canchaId)]
    const durationEnabled = durationsEnabled(initialTime, timesEnabled)

    const token = useAppSelector(state => state.auth.token) || ''
    const { mutate, isPending, error } = useMutation({
        mutationFn: async (duration: number) => await createReservation({ date, time: initialTime, duration: duration, canchaId: Number(canchaId), token: token }),
        mutationKey: ['reservations', date],
        onSuccess: (data) => {
            const horariosReservados = generateTimeArrayByDuration(data.time, data.duration)
            queryClient.setQueryData(['reservations', date], (old: ResponseReservations) => {
                const nuevosHorarios = old.timeFree[data.canchaId].filter((horario: string) => !horariosReservados.includes(horario))
                const newData: ResponseReservations = {
                    ...old,
                    timeFree: {
                        ...old.timeFree,
                        [data.canchaId]: nuevosHorarios
                    }
                }
                return newData
            })
            onCancel()
        }
    })


    const [duration, setDuration] = React.useState(30)
    const onSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        mutate(duration)
    }
    return (
        <Modal onClick={onCancel}>
            <form onClick={(e) => e.stopPropagation()} className='flex flex-col items-center gap-8 justify-center p-5 bg-white min-w-96 rounded'>
                <h1 className='text-3xl text-center'>Reservar</h1>
                <p>{isPending ? 'Cargando...' : ''}</p>
                <p>{error ? error.message : ''}</p>
                <div className='flex flex-col gap-6 w-full'>
                    <InfoForm keyValue='Fecha' value={date} />
                    <InfoForm keyValue='Desde' value={initialTime} />
                    <InfoForm keyValue='Cancha' value={canchaId} />

                    <div className='flex w-full justify-center'>
                        <label className='w-1/2 text-lg flex font-medium'>Duracion</label>
                        <select name='duration' value={duration} onChange={(e) => setDuration(Number(e.target.value))} className='w-1/2  flex border-b border-black'>
                            {
                                durationEnabled.map((duration) => 
                                <option className='text-center' key={duration.label} value={duration.value}>{duration.label}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className='flex gap-4 w-full' >
                    <button onClick={onCancel} disabled={isPending} className=' bg-red-500 w-full text-white p-2 rounded-md hover:opacity-90 transition-opacity'>Cancelar</button>
                    <button type='submit' onClick={onSubmit} disabled={isPending} className={`bg-green-500 w-full text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}>Reservar</button>
                </div>
            </form>
        </Modal>
    );
};

export default FormReserva
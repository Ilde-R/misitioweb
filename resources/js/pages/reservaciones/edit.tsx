import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Definir la interfaz de una reserva
interface Reserva {
    id: number;
    user_id: number;
    cabana_id: number;
    fecha_inicio: string;
    fecha_fin: string;
    total: number;
    estado: 'pendiente' | 'confirmada' | 'cancelada';
    metodo_pago: string;
    notas: string;
    numero_personas: number;
}

// Props que recibirá el componente
interface Props {
    reserva: Reserva;
    usuarios: { id: number; name: string }[];
    cabanas: { id: number; nombre: string }[];
}

const Edit = ({ reserva, usuarios, cabanas }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        user_id: reserva.user_id,
        cabana_id: reserva.cabana_id,
        fecha_inicio: reserva.fecha_inicio,
        fecha_fin: reserva.fecha_fin,
        total: reserva.total,
        estado: reserva.estado,
        metodo_pago: reserva.metodo_pago,
        notas: reserva.notas,
        numero_personas: reserva.numero_personas,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/reservas/${reserva.id}`);
    };

    return (
        <AppLayout>
            <Head title="Editar Reserva" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="mb-4 text-3xl font-bold">Editar Reserva</h1>

                <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
                    {/* Selección de Usuario */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Usuario</label>
                        <select
                            value={data.user_id}
                            onChange={(e) => setData('user_id', Number(e.target.value))}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value={0} disabled>
                                Selecciona un usuario
                            </option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-sm text-red-500">{errors.user_id}</p>}
                    </div>

                    {/* Selección de Cabaña */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Cabaña</label>
                        <select
                            value={data.cabana_id}
                            onChange={(e) => setData('cabana_id', Number(e.target.value))}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value={0} disabled>
                                Selecciona una cabaña
                            </option>
                            {cabanas.map((cabana) => (
                                <option key={cabana.id} value={cabana.id}>
                                    {cabana.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.cabana_id && <p className="text-sm text-red-500">{errors.cabana_id}</p>}
                    </div>

                    {/* Fechas */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Fecha Inicio</label>
                            <input
                                type="date"
                                value={data.fecha_inicio}
                                onChange={(e) => setData('fecha_inicio', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.fecha_inicio && <p className="text-sm text-red-500">{errors.fecha_inicio}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Fecha Fin</label>
                            <input
                                type="date"
                                value={data.fecha_fin}
                                onChange={(e) => setData('fecha_fin', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.fecha_fin && <p className="text-sm text-red-500">{errors.fecha_fin}</p>}
                        </div>
                    </div>

                    {/* Estado */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Estado</label>
                        <select
                            value={data.estado}
                            onChange={(e) => setData('estado', e.target.value as 'pendiente' | 'confirmada' | 'cancelada')}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                        {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
                    </div>

                    {/* Botón de Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Actualizar Reserva
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;

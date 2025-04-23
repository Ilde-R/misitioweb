import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    cabanas: { id: number; nombre: string }[]; // Lista de cabañas disponibles
    usuarios: { id: number; name: string }[]; // Lista de usuarios
}

const Create = ({ cabanas = [], usuarios = [] }: Props) => {
    const { data, setData, post, processing, errors } = useForm<{
        user_id: number;
        cabana_id: number;
        fecha_inicio: string;
        fecha_fin: string;
        total: number;
        estado: 'pendiente' | 'confirmada' | 'cancelada';
        metodo_pago: string;
        notas: string;
        numero_personas: number;
    }>({
        user_id: 0,
        cabana_id: 0,
        fecha_inicio: '',
        fecha_fin: '',
        total: 0,
        estado: 'pendiente',
        metodo_pago: '',
        notas: '',
        numero_personas: 1,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/reservas', {
            onFinish: () => {
                // Acción después de enviar el formulario
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Hacer Reserva" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="mb-4 text-3xl font-bold">Hacer Reservación</h1>

                <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
                    {/* Selección de Usuario */}
                    <div className="space-y-2">
                        <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Selecciona un Usuario</h2>
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
                        <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Cabañas Disponibles</h2>
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

                    {/* Fechas de Inicio y Fin */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Fecha Inicio</h2>
                            <input
                                type="date"
                                value={data.fecha_inicio}
                                onChange={(e) => setData('fecha_inicio', e.target.value)}
                                min={new Date().toISOString().split('T')[0]} // Establece la fecha mínima como hoy
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.fecha_inicio && <p className="text-sm text-red-500">{errors.fecha_inicio}</p>}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Fecha Fin</h2>
                            <input
                                type="date"
                                value={data.fecha_fin}
                                onChange={(e) => setData('fecha_fin', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.fecha_fin && <p className="text-sm text-red-500">{errors.fecha_fin}</p>}
                        </div>
                    </div>

                    {/* Método de Pago */}
                    <div className="space-y-2">
                        <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Método de Pago</h2>
                        <input
                            type="text"
                            value={data.metodo_pago}
                            onChange={(e) => setData('metodo_pago', e.target.value)}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.metodo_pago && <p className="text-sm text-red-500">{errors.metodo_pago}</p>}
                    </div>

                    {/* Notas */}
                    <div className="space-y-2">
                        <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Notas</h2>
                        <textarea
                            value={data.notas}
                            onChange={(e) => setData('notas', e.target.value)}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.notas && <p className="text-sm text-red-500">{errors.notas}</p>}
                    </div>

                    {/* Número de Personas */}
                    <div className="space-y-2">
                        <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Número de Personas</h2>
                        <input
                            type="number"
                            min={1}
                            value={data.numero_personas}
                            onChange={(e) => setData('numero_personas', Number(e.target.value))}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.numero_personas && <p className="text-sm text-red-500">{errors.numero_personas}</p>}
                    </div>

                    {/* Botón de Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Crear Reserva
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;

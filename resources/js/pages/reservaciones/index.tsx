import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reservaciones',
        href: '/reservas',
    },
];

export interface Reserva {
    id: number;
    user_id: number;
    cabana_id: number;
    fecha_inicio: string;
    fecha_fin: string;
    total: number;
    estado: 'pendiente' | 'confirmada' | 'cancelada';
    cabana?: {
        nombre: string;
        direccion?: string;
    };
    user?: {
        name: string;
        email: string;
    };
}

interface Props {
    reservas: Reserva[];
}

const Index = ({ reservas }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tus Reservaciones" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="mb-4 text-3xl font-bold">Administrar Reservaciones</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {reservas.map((reserva) => (
                        <div key={reserva.id} className="overflow-hidden rounded-lg bg-black/80 text-white shadow-lg">
                            <div className="p-4">
                                {/* Información de la reserva */}
                                <h3 className="text-lg font-semibold">Fecha de Inicio:</h3>
                                <p className="text-sm">{new Date(reserva.fecha_inicio).toLocaleDateString()}</p>
                                <h3 className="text-lg font-semibold">Fecha de Fin:</h3>
                                <p className="text-sm">{new Date(reserva.fecha_fin).toLocaleDateString()}</p>
                                <h3 className="text-lg font-semibold">Total:</h3>
                                <p className="text-lg font-semibold">${(Number(reserva.total) || 0).toFixed(2)}</p>
                                <p
                                    className={`mt-2 ${
                                        reserva.estado === 'pendiente'
                                            ? 'text-yellow-400'
                                            : reserva.estado === 'confirmada'
                                              ? 'text-green-400'
                                              : 'text-red-400'
                                    }`}
                                >
                                    {reserva.estado}
                                </p>
                                {/* Información del usuario */}
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Usuario:</h3>
                                    <p className="text-sm">Nombre: {reserva.user?.name}</p>
                                    <p className="text-sm">Email: {reserva.user?.email}</p>
                                </div>
                                {/* Información de la cabaña */}
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Cabaña:</h3>
                                    <p className="text-sm">Nombre: {reserva.cabana?.nombre}</p>
                                    <p className="text-sm">Ubicacion: {reserva.cabana?.direccion}</p>
                                </div>
                                {/* Botón para editar */}
                                <div className="mt-4">
                                    <button
                                        onClick={() => router.get(`/reservas/${reserva.id}/edit`)}
                                        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    >
                                        Editar Reserva
                                    </button>
                                    <button
                                        onClick={() => router.delete(`/reservas/${reserva.id}`)}
                                        className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                        >
                                            Eliminar Reserva
                                        </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;

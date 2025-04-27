import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SidebarFooter } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

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
    total: number | null; // Asegúrate de que este campo pueda ser `null`
    estado: 'pendiente' | 'confirmada' | 'cancelada' | 'inactiva';
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
    const [search, setSearch] = useState(''); // Estado para el buscador

    // Filtrar las reservaciones activas
    const filteredReservas = reservas.filter(
        (reserva) => reserva.estado !== 'inactiva' && reserva.user?.name.toLowerCase().includes(search.toLowerCase()),
    );

    // Filtrar las reservaciones inactivas para el historial
    const filteredHistorialReservas = reservas.filter(
        (reserva) => reserva.estado === 'inactiva' && reserva.user?.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tus Reservaciones" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="mb-4 text-3xl font-bold">Administrar Reservaciones</h1>

                {/* Buscador */}
                <div className="mb-6">
                    <Input
                        id="search"
                        type="text"
                        placeholder="Buscar por nombre de usuario..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Lista de reservaciones activas */}
                <h2 className="text-2xl font-semibold">Reservaciones Activas</h2>
                <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {' '}
                    {/* Espacio para el SidebarFooter */}
                    {filteredReservas.length > 0 ? (
                        filteredReservas.map((reserva) => (
                            <Card key={reserva.id} className="flex h-full flex-col overflow-hidden rounded-lg">
                                <CardHeader>
                                    <CardTitle>{reserva.cabana?.nombre || 'Cabaña Desconocida'}</CardTitle>
                                    <CardDescription>{reserva.cabana?.direccion || 'Dirección no disponible'}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm">
                                        <strong>Usuario:</strong> {reserva.user?.name || 'Usuario desconocido'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Email:</strong> {reserva.user?.email || 'Email no disponible'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Fecha de Inicio:</strong> {new Date(reserva.fecha_inicio).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Fecha de Fin:</strong> {new Date(reserva.fecha_fin).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Total:</strong> ${Number(reserva.total || 0).toFixed(2)}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Estado:</strong> {reserva.estado || 'Usuario desconocido'}
                                    </p>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button onClick={() => router.get(`/reservas/${reserva.id}/edit`)} className="mr-2">
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (confirm('¿Estás seguro de que deseas archivar esta reservación?')) {
                                                router.put(`/reservas/${reserva.id}/archivar`);
                                            }
                                        }}
                                        className="mr-2 bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                    >
                                        Archivar
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center">No se encontraron reservaciones activas.</p>
                    )}
                </div>

                {/* Historial de reservaciones */}
                <h2 className="mt-8 text-2xl font-semibold">Historial de Reservaciones</h2>
                <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {' '}
                    {/* Espacio para el SidebarFooter */}
                    {filteredHistorialReservas.length > 0 ? (
                        filteredHistorialReservas.map((reserva) => (
                            <Card key={reserva.id} className="flex h-full flex-col overflow-hidden rounded-lg">
                                <CardHeader>
                                    <CardTitle>{reserva.cabana?.nombre || 'Cabaña Desconocida'}</CardTitle>
                                    <CardDescription>{reserva.cabana?.direccion || 'Dirección no disponible'}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm">
                                        <strong>Usuario:</strong> {reserva.user?.name || 'Usuario desconocido'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Email:</strong> {reserva.user?.email || 'Email no disponible'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Fecha de Inicio:</strong> {new Date(reserva.fecha_inicio).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Fecha de Fin:</strong> {new Date(reserva.fecha_fin).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Total:</strong> ${Number(reserva.total || 0).toFixed(2)}
                                    </p>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button
                                        onClick={() => {
                                            if (confirm('¿Estás seguro de que deseas eliminar esta reservación?')) {
                                                router.delete(`/reservas/${reserva.id}`);
                                            }
                                        }}
                                        className="mr-2 bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                    >
                                        Eliminar
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center">No hay reservaciones en el historial.</p>
                    )}
                </div>
            </div>

            {/* SidebarFooter */}
            <SidebarFooter>
                <div className="fixed right-4 bottom-4">
                    <Button onClick={() => router.get('/reservas/create')}>Crear Reservación</Button>
                </div>
            </SidebarFooter>
        </AppLayout>
    );
};

export default Index;

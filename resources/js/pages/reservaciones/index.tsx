import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
                    <Label htmlFor="search" className="mb-2 block text-sm font-medium text-gray-700">
                        Buscar por Nombre
                    </Label>
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredReservas.length > 0 ? (
                        filteredReservas.map((reserva) => (
                            <Card key={reserva.id}>
                                <CardHeader>
                                    <CardTitle>{reserva.cabana?.nombre || 'Cabaña Desconocida'}</CardTitle>
                                    <CardDescription>{reserva.cabana?.direccion || 'Dirección no disponible'}</CardDescription>
                                </CardHeader>
                                <CardContent>
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
                                    <p
                                        className={`mt-2 text-sm ${
                                            reserva.estado === 'pendiente'
                                                ? 'text-yellow-400'
                                                : reserva.estado === 'confirmada'
                                                  ? 'text-green-400'
                                                  : 'text-red-400'
                                        }`}
                                    >
                                        {reserva.estado}
                                    </p>
                                </CardContent>
                                <CardFooter>
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
                        <p className="text-center text-white">No se encontraron reservaciones activas.</p>
                    )}
                </div>

                {/* Historial de reservaciones */}
                <h2 className="mt-8 text-2xl font-semibold">Historial de Reservaciones</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredHistorialReservas.length > 0 ? (
                        filteredHistorialReservas.map((reserva) => (
                            <Card key={reserva.id}>
                                <CardHeader>
                                    <CardTitle>{reserva.cabana?.nombre || 'Cabaña Desconocida'}</CardTitle>
                                    <CardDescription>{reserva.cabana?.direccion || 'Dirección no disponible'}</CardDescription>
                                </CardHeader>
                                <CardContent>
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
                                <CardFooter>
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
                        <p className="text-center text-white">No hay reservaciones en el historial.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;

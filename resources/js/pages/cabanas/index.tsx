import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// Definir los elementos de breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrar Cabañas',
        href: '/cabanas/index',
    },
];

// Definir la interfaz de una cabana
interface Cabana {
    id: number;
    nombre: string;
    direccion: string;
    ciudad: string;
    estado: string;
    pais: string;
    capacidad: number;
    precio_noche: number;
    disponible: boolean;
    imagen: string;
    descripcion: string;
    servicios: string[];
    politicas: string;
}

// Definir las propiedades que recibirá el componente
interface Props {
    cabanas: Cabana[];
}

// Componente principal
const Index = ({ cabanas }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Turismo - Bienvenido" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="mb-4 text-3xl font-bold">Cabañas Registradas</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cabanas.map((cabana) => (
                        <Card key={cabana.id} className="flex h-full flex-col overflow-hidden rounded-lg">
                            <CardHeader>
                                <img src={`/storage/${cabana.imagen}`} alt={cabana.nombre} className="h-48 w-full object-cover" />
                                <CardTitle>{cabana.nombre}</CardTitle>
                                <CardDescription>
                                    {cabana.direccion}, {cabana.ciudad}, {cabana.estado}, {cabana.pais}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                {/* Precio */}
                                <p className="text-sm">
                                    <strong>Precio: </strong>${cabana.precio_noche} por noche
                                </p>
                                {/* Descripción */}
                                <p className="text-sm">
                                    <strong>Descripción: </strong>
                                    {cabana.descripcion}
                                </p>
                                {/* Capacidad */}
                                <p className="text-sm">
                                    <strong>Capacidad: </strong>
                                    {cabana.capacidad} personas
                                </p>
                                {/* Servicios */}
                                <p className="text-sm">
                                    <strong>Servicios: </strong>
                                    {Array.isArray(cabana.servicios) ? cabana.servicios.join(', ') : JSON.parse(cabana.servicios || '[]').join(', ')}
                                </p>
                                {/* Políticas */}
                                <p className="text-sm">
                                    <strong>Políticas: </strong>
                                    {cabana.politicas}
                                </p>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <p className={`mt-2 ${cabana.disponible ? 'text-green-400' : 'text-red-400'}`}>
                                    {cabana.disponible ? 'Disponible' : 'No disponible'}
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;

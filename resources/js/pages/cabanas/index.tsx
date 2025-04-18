// src/pages/Cabanas/Index.tsx
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
    ubicacion: string;
    capacidad: number;
    precio_noche: number;
    disponible: boolean;
    imagen: string;
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
                        <div
                            key={cabana.id}
                            className="transform overflow-hidden rounded-lg bg-black/80 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/60"
                        >
                            <img src={`/storage/${cabana.imagen}`} alt={cabana.nombre} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{cabana.nombre}</h2>
                                <p className="text-sm text-gray-300">{cabana.ubicacion}</p>
                                <p className="mt-2 text-lg font-semibold">${cabana.precio_noche} por noche</p>
                                <p className={`mt-2 ${cabana.disponible ? 'text-green-400' : 'text-red-400'}`}>
                                    {cabana.disponible ? 'Disponible' : 'No disponible'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Definir los elementos de breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registrar Cabañas',
        href: '/cabanas/create',
    },
];

// Definir la interfaz de una cabaña
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
const Create = ({ cabanas }: Props) => {
    const { data, setData, post, processing, errors } = useForm<{
        nombre: string;
        ubicacion: string;
        capacidad: number;
        precio_noche: number;
        disponible: boolean;
        imagen: File | null;
    }>({
        nombre: '',
        ubicacion: '',
        capacidad: 1,
        precio_noche: 0,
        disponible: true,
        imagen: null,
    });

    // Función para manejar el cambio del campo 'Disponible'
    const handleDisponibleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('disponible', e.target.value === 'true');
    };

    // Función para manejar el cambio de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData('imagen', file);
    };

    // Función para enviar el formulario
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/cabanas', {
            onFinish: () => {
                // Aquí puedes hacer algo cuando el formulario se haya enviado correctamente
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Turismo - Registrar Cabaña" />

            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="text-2xl font-semibold text-white">Registrar Nueva Cabaña</h1>

                <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6" encType="multipart/form-data">
                    {/* Sección: Nombre y Ubicación */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block font-medium text-white">Nombre</label>
                            <input
                                type="text"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-white">Ubicación</label>
                            <input
                                type="text"
                                value={data.ubicacion}
                                onChange={(e) => setData('ubicacion', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.ubicacion && <p className="text-sm text-red-500">{errors.ubicacion}</p>}
                        </div>
                    </div>

                    {/* Sección: Capacidad y Precio */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block font-medium text-white">Capacidad</label>
                            <input
                                type="number"
                                min={1}
                                value={data.capacidad}
                                onChange={(e) => setData('capacidad', Number(e.target.value))}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.capacidad && <p className="text-sm text-red-500">{errors.capacidad}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-white">Precio por Noche</label>
                            <input
                                type="number"
                                min={0}
                                value={data.precio_noche}
                                onChange={(e) => setData('precio_noche', Number(e.target.value))}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.precio_noche && <p className="text-sm text-red-500">{errors.precio_noche}</p>}
                        </div>
                    </div>

                    {/* Sección: Disponibilidad */}
                    <div className="space-y-2">
                        <label className="block font-medium text-white">Disponible</label>
                        <select
                            value={data.disponible ? 'true' : 'false'}
                            onChange={handleDisponibleChange}
                            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="true" className="bg-gray-800 text-white">
                                Sí
                            </option>
                            <option value="false" className="bg-gray-800 text-white">
                                No
                            </option>
                        </select>

                        {errors.disponible && <p className="text-sm text-red-500">{errors.disponible}</p>}
                    </div>

                    {/* Sección: Imagen */}
                    <div className="space-y-2">
                        <label className="block font-medium text-white">Imagen</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.imagen && <p className="text-sm text-red-500">{errors.imagen}</p>}
                    </div>

                    {/* Botón de Submit */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Registrar Cabaña
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;

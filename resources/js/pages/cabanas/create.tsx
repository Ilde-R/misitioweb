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
interface Props {}

const Create = ({}: Props) => {
    const { data, setData, post, processing, errors } = useForm<{
        nombre: string;
        direccion: string;
        ciudad: string;
        estado: string;
        pais: string;
        capacidad: number;
        precio_noche: number;
        disponible: boolean;
        imagen: File | null;
        descripcion: string;
        servicios: string[];
        politicas: string;
    }>({
        nombre: '',
        direccion: '',
        ciudad: '',
        estado: '',
        pais: '',
        capacidad: 1,
        precio_noche: 0,
        disponible: true,
        imagen: null,
        descripcion: '',
        servicios: [],
        politicas: '',
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

    // Función para manejar el cambio de servicios
    const handleServiciosChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedServicios = [...data.servicios];
        updatedServicios[index] = e.target.value;
        setData('servicios', updatedServicios);
    };

    // Función para agregar un nuevo servicio
    const addServicio = () => {
        setData('servicios', [...data.servicios, '']);
    };

    // Función para eliminar un servicio
    const removeServicio = (index: number) => {
        const updatedServicios = data.servicios.filter((_, i) => i !== index);
        setData('servicios', updatedServicios);
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
                            <label className="block font-medium text-white">Dirección</label>
                            <input
                                type="text"
                                value={data.direccion}
                                onChange={(e) => setData('direccion', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.direccion && <p className="text-sm text-red-500">{errors.direccion}</p>}
                        </div>
                    </div>

                    {/* Sección: Ciudad, Estado y País */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="block font-medium text-white">Ciudad</label>
                            <input
                                type="text"
                                value={data.ciudad}
                                onChange={(e) => setData('ciudad', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.ciudad && <p className="text-sm text-red-500">{errors.ciudad}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-white">Estado</label>
                            <input
                                type="text"
                                value={data.estado}
                                onChange={(e) => setData('estado', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-white">País</label>
                            <input
                                type="text"
                                value={data.pais}
                                onChange={(e) => setData('pais', e.target.value)}
                                className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.pais && <p className="text-sm text-red-500">{errors.pais}</p>}
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

                    {/* Sección: Descripción */}
                    <div className="space-y-2">
                        <label className="block font-medium text-white">Descripción</label>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion}</p>}
                    </div>

                    {/* Sección: Servicios */}
                    <div className="space-y-2">
                        <label className="block font-medium text-white">Servicios</label>
                        {data.servicios.map((servicio, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={servicio}
                                    onChange={(e) => handleServiciosChange(e, index)}
                                    className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeServicio(index)}
                                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addServicio} className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            Agregar Servicio
                        </button>
                        {errors.servicios && <p className="text-sm text-red-500">{errors.servicios}</p>}
                    </div>

                    {/* Sección: Políticas */}
                    <div className="space-y-2">
                        <label className="block font-medium text-white">Políticas</label>
                        <textarea
                            value={data.politicas}
                            onChange={(e) => setData('politicas', e.target.value)}
                            className="w-full rounded border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.politicas && <p className="text-sm text-red-500">{errors.politicas}</p>}
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

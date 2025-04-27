import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hacer Reserva',
        href: '/reservas/create',
    },
];


interface Props {
    cabanas: {
        id: number;
        nombre: string;
        direccion: string;
        capacidad: number;
        precio_noche: number;
        disponible: boolean;
        imagen: string | null;
    }[]; // Lista de cabañas disponibles
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
            ...data, // Envía los datos actuales sin el total
            onFinish: () => {
                // Acción después de enviar el formulario
            },
        });
    };
const calculateTotal = () => {
    if (!data.fecha_inicio || !data.fecha_fin || !data.cabana_id) return 0;

    const startDate = new Date(data.fecha_inicio);
    const endDate = new Date(data.fecha_fin);

    // Calcula la diferencia en días
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Encuentra la cabaña seleccionada
    const selectedCabana = cabanas.find((cabana) => cabana.id === data.cabana_id);

    // Calcula el total
    return selectedCabana ? selectedCabana.precio_noche * diffDays : 0;
};
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hacer Reserva" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                <h1 className="mb-4 text-3xl font-bold">Hacer Reservacion</h1>

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
                        <section>
                            <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 mb-4 text-2xl font-semibold">Cabañas Disponibles</h2>
                            <div className="grid gap-8 md:grid-cols-3">
                                {Array.isArray(cabanas) && cabanas.length > 0 ? (
                                    cabanas.map(
                                        (cabana) =>
                                            cabana.disponible && (
                                                <Card
                                                    key={cabana.id}
                                                    className={`flex h-full transform cursor-pointer flex-col overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg ${
                                                        data.cabana_id === cabana.id ? 'border-2 border-blue-500' : ''
                                                    }`}
                                                    onClick={() => setData('cabana_id', cabana.id)} // Selecciona la cabaña al hacer clic
                                                >
                                                    <CardHeader>
                                                        <img
                                                            src={cabana.imagen ? `/storage/${cabana.imagen}` : '/images/default-cabana.jpg'}
                                                            alt={`Imagen de la cabaña ${cabana.nombre}`}
                                                            className="h-56 w-full rounded-xl object-cover"
                                                        />
                                                        <CardTitle>{cabana.nombre}</CardTitle>
                                                        <CardDescription>{cabana.direccion || 'Dirección no disponible'}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <strong>Precio por noche:</strong> ${cabana.precio_noche} <br />
                                                        <strong>Capacidad:</strong> {cabana.capacidad} personas
                                        
                                                    </CardContent>
                                                    <CardFooter>
                                                        <p className={`mt-2 text-sm ${cabana.disponible ? 'text-green-400' : 'text-red-400'}`}>
                                                            {cabana.disponible ? 'Disponible' : 'No disponible'}
                                                        </p>
                                                    </CardFooter>
                                                </Card>
                                            ),
                                    )
                                ) : (
                                    <p className="text-white">No hay cabañas disponibles en este momento.</p>
                                )}
                            </div>
                            {errors.cabana_id && <p className="text-sm text-red-500">{errors.cabana_id}</p>}
                        </section>
                    </div>

                    {/* Fechas de Inicio y Fin */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Fecha Inicio</h2>
                            <Input
                                type="date"
                                value={data.fecha_inicio}
                                onChange={(e) => setData('fecha_inicio', e.target.value)}
                                min={new Date().toISOString().split('T')[0]} // Establece la fecha mínima como hoy
                            />
                            {errors.fecha_inicio && <p className="text-sm text-red-500">{errors.fecha_inicio}</p>}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Fecha Fin</h2>
                            <Input
                                type="date"
                                value={data.fecha_fin}
                                onChange={(e) => setData('fecha_fin', e.target.value)}
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

                    {/* Total */}
                    <div className="space-y-2">
                        <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Total</h2>
                        <p className="text-lg font-bold">${calculateTotal().toFixed(2)}</p>
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

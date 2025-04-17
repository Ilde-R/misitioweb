// src/pages/Dashboard.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// Definir los elementos de breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
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
    imagen: string | null; // Asegurarnos de que la imagen puede ser null
}

// Definir las propiedades que recibirá el componente
interface Props {
    cabanas: Cabana[]; // Recibimos un arreglo de cabañas
}

// Componente principal
const Dashboard = ({ cabanas }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Turismo - Dashboard" />
            <div className="flex min-h-screen flex-col gap-6 p-6">
                {/* Sección de bienvenida */}
                <div className="relative h-64 overflow-hidden rounded-xl shadow-lg">
                    <img
                        src="https://picsum.photos/1200/400?grayscale&blur=1"
                        alt="Paisaje de bienvenida"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/40">
                        <div className="text-center text-white">
                            <h1 className="text-4xl font-bold">Bienvenido a la aventura</h1>
                            <p className="text-lg">Turismo, naturaleza y descanso en un solo lugar</p>
                        </div>
                    </div>
                </div>

                {/* Cabañas disponibles */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-white">🏡 Cabañas disponibles</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Aseguramos que cabanas sea un arreglo */}
                        {Array.isArray(cabanas) && cabanas.length > 0 ? (
                            cabanas.map((cabana) => {
                                console.log(cabana); // Verifica los datos de cada cabaña
                                return (
                                    cabana.disponible && (
                                        <div
                                            key={cabana.id}
                                            className="rounded-xl border border-white/10 bg-black/80 p-4 text-white shadow transition-all hover:scale-105 hover:shadow-xl"
                                        >
                                            <img src={`/storage/${cabana.imagen}`} alt={cabana.nombre} className="h-48 w-full object-cover" />
                                            <h3 className="text-lg font-bold">{cabana.nombre}</h3>
                                            <p className="mb-2 text-sm text-gray-300">{cabana.ubicacion}</p>
                                            <p className="mt-2 text-lg font-semibold">${cabana.precio_noche} por noche</p>
                                            <p className={`mt-2 ${cabana.disponible ? 'text-green-400' : 'text-red-400'}`}>
                                                {cabana.disponible ? 'Disponible' : 'No disponible'}
                                            </p>
                                        </div>
                                    )
                                );
                            })
                        ) : (
                            <p className="text-white">No hay cabañas disponibles en este momento.</p>
                        )}
                    </div>
                </section>

                {/* Caminatas */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-white">🚶 Caminatas y rutas</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-black/80 p-4 text-white shadow">
                            <h3 className="font-semibold">Sendero del Bosque Encantado</h3>
                            <p className="text-sm text-gray-300">
                                Un recorrido de 5km entre árboles centenarios. Ideal para familias y amantes de la naturaleza.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/80 p-4 text-white shadow">
                            <h3 className="font-semibold">Ruta de los Miradores</h3>
                            <p className="text-sm text-gray-300">
                                Caminata moderada con vistas espectaculares al amanecer. Apta para mayores de 12 años.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Lugares para visitar */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-white">📍 Lugares recomendados</h2>
                    <ul className="list-inside list-disc space-y-2 text-sm text-gray-300">
                        <li>Mirador de la Peña Blanca</li>
                        <li>Parque de las Luciérnagas</li>
                        <li>Cascada El Salto Secreto</li>
                        <li>Centro de Artesanías Locales</li>
                    </ul>
                </section>

                {/* Footer */}
                <footer className="text-muted-foreground mt-12 border-t pt-6 text-center text-sm">
                    © 2025 Turismo Encantado ·{' '}
                    <a href="#" className="text-primary hover:underline">
                        Facebook
                    </a>{' '}
                    ·{' '}
                    <a href="#" className="text-primary hover:underline">
                        Instagram
                    </a>
                </footer>
            </div>
        </AppLayout>
    );
};

export default Dashboard;

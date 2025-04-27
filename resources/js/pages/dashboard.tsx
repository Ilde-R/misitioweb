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
    direccion: string;
    capacidad: number;
    precio_noche: number;
    disponible: boolean;
    imagen: string | null;
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
            <div className="flex min-h-screen flex-col gap-8 p-8">
                {/* Sección de bienvenida */}
                <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src="https://picsum.photos/1200/400?grayscale&blur=1"
                        alt="Paisaje de bienvenida"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                            <h1 className="text-5xl font-extrabold">Bienvenido a la aventura</h1>
                            <p className="mt-2 text-xl">Turismo, naturaleza y descanso en un solo lugar</p>
                        </div>
                    </div>
                </div>

                {/* Cabañas disponibles */}
                <section>
                    <h2 className="text-subtitle-light dark:text-subtitle-dark mt-8 text-2xl font-semibold">Cabañas Disponibles</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {Array.isArray(cabanas) && cabanas.length > 0 ? (
                            cabanas.map((cabana) => {
                                return (
                                    cabana.disponible && (
                                        <div
                                            key={cabana.id}
                                            className="mt-6 rounded-2xl border border-white/20 bg-black/70 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                        >
                                            <img
                                                src={cabana.imagen ? `/storage/${cabana.imagen}` : '/images/default-cabana.jpg'}
                                                alt={`Imagen de la cabaña ${cabana.nombre}`}
                                                className="h-56 w-full rounded-xl object-cover"
                                            />
                                            <h3 className="mt-4 text-xl font-bold">{cabana.nombre}</h3>
                                            <p className="text-sm text-gray-300">{cabana.direccion}</p>
                                            <p className="mt-3 text-lg font-semibold">${cabana.precio_noche} por noche</p>
                                            <p className={`mt-3 text-sm ${cabana.disponible ? 'text-green-400' : 'text-red-400'}`}>
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
                    <h2 className="text-subtitle-light dark:text-subtitle-dark text-2xl font-semibold">Caminatas</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/20 bg-black/70 p-6 text-white shadow-lg">
                            <h3 className="text-xl font-semibold">Sendero del Bosque Encantado</h3>
                            <p className="text-sm text-gray-300">
                                Un recorrido de 5km entre árboles centenarios. Ideal para familias y amantes de la naturaleza.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/20 bg-black/70 p-6 text-white shadow-lg">
                            <h3 className="text-xl font-semibold">Ruta de los Miradores</h3>
                            <p className="text-sm text-gray-300">
                                Caminata moderada con vistas espectaculares al amanecer. Apta para mayores de 12 años.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Lugares para visitar */}
                <section>
                    <h2 className="text-subtitle-light dark:text-subtitle-dark text-2xl font-semibold">Lugares por visitar</h2>
                    <ul className="list-inside list-disc space-y-4 text-sm text-gray-300">
                        <li>Mirador de la Peña Blanca</li>
                        <li>Parque de las Luciérnagas</li>
                        <li>Cascada El Salto Secreto</li>
                        <li>Centro de Artesanías Locales</li>
                    </ul>
                </section>

                {/* Footer */}
                <footer className="text-muted-foreground mt-16 border-t pt-8 text-center text-sm">
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

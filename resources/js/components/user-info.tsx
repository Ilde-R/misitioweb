import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { User as UserIcon } from 'lucide-react'; // Icono de usuario

export function UserInfo({ user, showEmail = false }: { user: User | null | undefined; showEmail?: boolean }) {
    const getInitials = useInitials();

    // Si no hay usuario autenticado
    if (!user) {
        return (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
                {/* Si no hay usuario, mostrar ícono de usuario */}
                <UserIcon className="h-8 w-8 text-gray-500 dark:text-gray-300" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                    {/* Aquí se muestra un texto alternativo si no hay usuario */}
                    <span className="truncate font-medium">Registrarse</span>
                    {showEmail && <span className="text-muted-foreground truncate text-xs">No disponible</span>}
                </div>
            </div>
        );
    }

    // Si el usuario está autenticado, mostrar su nombre y opcionalmente su correo
    return (
        <div className="flex items-center gap-2">
            {/* Mostrar las iniciales del usuario o el ícono si no tiene nombre */}
            {user.name ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white dark:bg-gray-700">
                    {getInitials(user.name)}
                </span>
            ) : (
                <UserIcon className="h-8 w-8 text-gray-500 dark:text-gray-300" />
            )}

            {/* Mostrar nombre y correo si están disponibles */}
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-gray-900 dark:text-white">{user.name}</span>
                {showEmail && user.email && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </div>
    );
}

import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { User as UserIcon } from 'lucide-react'; // Icono de usuario

export function UserInfo({ user, showEmail = false }: { user: User | null | undefined; showEmail?: boolean }) {
    const getInitials = useInitials();

    // Si no hay usuario autenticado
    if (!user) {
        return (
            <div className="flex items-center gap-2">
                {/* Si no hay usuario, mostrar ícono de usuario */}
                <UserIcon className="h-8 w-8 text-gray-500" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                    {/* Aquí se muestra un texto alternativo si no hay usuario */}
                    <span className="truncate font-medium text-gray-500">Registrarse</span>
                    {showEmail && <span className="text-muted-foreground truncate text-xs">No disponible</span>}
                </div>
            </div>
        );
    }

    // Si el usuario está autenticado, no mostrar nada
    return null;
}

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Bed, BookOpen, Globe, Headphones, LayoutGrid, MapPin, Folder } from 'lucide-react'; 
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Reservación Alojamiento',
        href: '/reservacion-alojamiento',
        icon: Bed, 
    },
    {
        title: 'Paquetes Turísticos',
        href: '/paquetes-turisticos',
        icon: MapPin, 
    },
    {
        title: 'Experiencias Culturales y de Aventura',
        href: '/experiencias-culturales',
        icon: Globe, 
    },
    {
        title: 'Atención Personalizada',
        href: '/atencion-personalizada',
        icon: Headphones, 
    },
    {
        title: 'Turismo Educativo y Temático',
        href: '/turismo-educativo',
        icon: BookOpen, 
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Trophy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Training Modules",
      href: "/dashboard/courses",
      icon: BookOpen,
      exact: false,
    },
    {
      title: "Combat Records",
      href: "/dashboard/achievements",
      icon: Trophy,
      exact: false,
    },
    {
      title: "System Setup",
      href: "/dashboard/settings",
      icon: Settings,
      exact: false,
    },
  ];

  return (
    <nav className="flex-1 px-4 py-8 space-y-4">
      {navItems.map((item) => {
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname?.startsWith(item.href);

        const Icon = item.icon;

        return (
          <Link key={item.href} href={item.href} className="block">
            <Button 
              variant="ghost" 
              className={`w-full justify-start rounded-none border-l-4 font-bold uppercase tracking-widest text-xs transition-all h-12 hover:translate-x-1 ${
                isActive 
                  ? "border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground shadow-[2px_2px_0px_rgba(251,191,36,0.5)]" 
                  : "border-transparent text-muted-foreground hover:border-accent hover:bg-accent/10 hover:text-accent"
              }`}
            >
              <Icon className="mr-3 w-4 h-4" /> {item.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

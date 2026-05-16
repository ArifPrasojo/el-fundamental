"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Trophy, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileHeader({ userInitial, userName, userEmail, onSignOut }: { userInitial: string, userName: string, userEmail: string, onSignOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
    { title: "Training Modules", href: "/dashboard/courses", icon: BookOpen, exact: false },
    { title: "Combat Records", href: "/dashboard/achievements", icon: Trophy, exact: false },
    { title: "System Setup", href: "/dashboard/settings", icon: Settings, exact: false },
  ];

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b-2 border-border bg-background shadow-[0px_4px_0px_rgba(28,61,138,0.2)] z-50 relative">
        <Link href="/" className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L93 30 L93 70 L50 95 L7 70 L7 30 Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="bevel" className="text-primary" />
            <path d="M30 35 L70 35 L70 45 L30 45 Z" fill="currentColor" className="text-secondary" />
            <path d="M30 55 L55 55 L55 65 L30 65 Z" fill="currentColor" className="text-accent" />
            <rect x="70" y="55" width="10" height="10" fill="currentColor" className="text-primary" />
          </svg>
          <span className="font-extrabold uppercase tracking-widest text-primary text-sm hidden sm:inline-block">Command Center</span>
        </Link>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="border-2 border-primary text-primary hover:bg-primary/10 rounded-none shadow-[2px_2px_0px_rgba(28,61,138,1)]">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[74px] bg-background/95 backdrop-blur-sm z-40 flex flex-col border-t-2 border-primary">
          <nav className="flex-1 px-4 py-8 space-y-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="block" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start rounded-none border-l-4 font-bold uppercase tracking-widest text-xs transition-all h-14 hover:translate-x-1 ${
                      isActive 
                        ? "border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground shadow-[2px_2px_0px_rgba(251,191,36,0.5)]" 
                        : "border-transparent text-muted-foreground hover:border-accent hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    <Icon className="mr-3 w-5 h-5" /> {item.title}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t-2 border-border bg-black/40">
            <div className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest border border-primary mb-3">
              /// ACTIVE_PILOT
            </div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 border-2 border-primary bg-primary/20 flex items-center justify-center text-primary font-bold shadow-[2px_2px_0px_rgba(28,61,138,1)]">
                {userInitial}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-base font-bold uppercase tracking-wider truncate text-primary">{userName}</p>
                <p className="text-xs font-mono text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsOpen(false);
                onSignOut();
              }}
              className="w-full justify-center rounded-none border-2 border-accent text-accent font-bold uppercase tracking-widest text-xs hover:border-accent hover:bg-accent hover:text-accent-foreground shadow-[2px_2px_0px_transparent] hover:shadow-[4px_4px_0px_rgba(224,26,34,0.5)] transition-all h-12"
            >
              <LogOut className="mr-2 w-4 h-4" /> Terminate Session
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

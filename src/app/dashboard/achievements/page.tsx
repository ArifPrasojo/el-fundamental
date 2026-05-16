import { Trophy, Medal, Star, Shield, Zap, Target } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    {
      title: "First Blood",
      description: "Complete your very first coding mission.",
      icon: Target,
      unlocked: true,
      color: "bg-primary",
      textColor: "text-primary-foreground",
    },
    {
      title: "Syntax Sentinel",
      description: "Write code with zero syntax errors for 5 consecutive missions.",
      icon: Shield,
      unlocked: true,
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
    },
    {
      title: "Python Pioneer",
      description: "Complete all Python basic curriculum modules.",
      icon: Star,
      unlocked: false,
      color: "bg-muted",
      textColor: "text-muted-foreground",
    },
    {
      title: "JavaScript Juggernaut",
      description: "Complete all JavaScript modern curriculum modules.",
      icon: Zap,
      unlocked: false,
      color: "bg-muted",
      textColor: "text-muted-foreground",
    },
    {
      title: "7-Day Streak",
      description: "Login and complete at least one mission for 7 consecutive days.",
      icon: Medal,
      unlocked: false,
      color: "bg-muted",
      textColor: "text-muted-foreground",
    },
    {
      title: "Master Pilot",
      description: "Earn a total of 10,000 XP.",
      icon: Trophy,
      unlocked: false,
      color: "bg-muted",
      textColor: "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold tracking-widest border-2 border-primary shadow-[2px_2px_0px_rgba(28,61,138,1)] mb-4">
          /// PILOT_RECORDS
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-primary">Combat Medals</h1>
        <p className="text-foreground font-medium mt-2 max-w-2xl">
          Review your unlocked achievements and active bounties. Prove your worth in the terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((badge, i) => (
          <div key={i} className={`mecha-panel p-6 ${badge.unlocked ? 'border-primary shadow-[4px_4px_0px_rgba(28,61,138,0.3)]' : 'border-muted opacity-60 grayscale'}`}>
            <div className={`w-14 h-14 flex items-center justify-center mb-4 border-2 ${badge.unlocked ? 'border-primary shadow-[4px_4px_0px_rgba(251,191,36,1)]' : 'border-muted'} ${badge.color} ${badge.textColor}`}>
              <badge.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold uppercase mb-2">{badge.title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{badge.description}</p>
            
            {!badge.unlocked && (
              <div className="mt-4 text-xs font-bold uppercase text-accent tracking-wider">
                [ LOCKED ]
              </div>
            )}
            {badge.unlocked && (
              <div className="mt-4 text-xs font-bold uppercase text-primary tracking-wider">
                [ UNLOCKED ]
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

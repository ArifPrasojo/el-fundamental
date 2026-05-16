import { Trophy, Medal, Star, Shield, Zap, Target } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AchievementsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // Fetch user progress and course data
  const userProgress = await db.userProgress.findMany({
    where: { userId: session.user.id },
    include: { chapter: { include: { course: true } } }
  });

  const allCourses = await db.course.findMany({
    include: { chapters: true }
  });

  // Calculate statistics
  const totalCompleted = userProgress.length;
  const totalXP = totalCompleted * 50;

  // Python curriculum logic
  const pythonCourse = allCourses.find(c => c.language === "python");
  const pythonCompleted = pythonCourse 
    ? userProgress.filter(p => p.chapter.courseId === pythonCourse.id).length 
    : 0;
  const isPythonMaster = pythonCourse && pythonCourse.chapters.length > 0 && pythonCompleted >= pythonCourse.chapters.length;

  // JS curriculum logic
  const jsCourse = allCourses.find(c => c.language === "javascript");
  const jsCompleted = jsCourse 
    ? userProgress.filter(p => p.chapter.courseId === jsCourse.id).length 
    : 0;
  const isJsMaster = jsCourse && jsCourse.chapters.length > 0 && jsCompleted >= jsCourse.chapters.length;

  const achievements = [
    {
      title: "First Blood",
      description: "Complete your very first coding mission.",
      icon: Target,
      unlocked: totalCompleted > 0,
      color: "bg-primary",
      textColor: "text-primary-foreground",
    },
    {
      title: "Syntax Sentinel",
      description: "Write code and complete 5 coding missions.",
      icon: Shield,
      unlocked: totalCompleted >= 5,
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
    },
    {
      title: "Python Pioneer",
      description: "Complete all Python basic curriculum modules.",
      icon: Star,
      unlocked: !!isPythonMaster,
      color: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "JavaScript Juggernaut",
      description: "Complete all JavaScript modern curriculum modules.",
      icon: Zap,
      unlocked: !!isJsMaster,
      color: "bg-yellow-500",
      textColor: "text-black",
    },
    {
      title: "Veteran Pilot",
      description: "Complete at least 10 missions across any modules.",
      icon: Medal,
      unlocked: totalCompleted >= 10,
      color: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Master Commander",
      description: "Earn a total of 500 XP.",
      icon: Trophy,
      unlocked: totalXP >= 500,
      color: "bg-accent",
      textColor: "text-accent-foreground",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold tracking-widest border-2 border-primary shadow-[2px_2px_0px_rgba(28,61,138,1)] mb-4">
            /// PILOT_RECORDS
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-primary">Combat Medals</h1>
          <p className="text-foreground font-medium mt-2 max-w-2xl">
            Review your unlocked achievements and active bounties. Prove your worth in the terminal.
          </p>
        </div>
        
        <div className="mecha-panel border-2 border-primary p-4 shrink-0 flex items-center space-x-6 bg-primary/5 shadow-[4px_4px_0px_rgba(28,61,138,0.2)]">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Total XP</span>
            <span className="text-2xl font-black text-primary font-mono">{totalXP}</span>
          </div>
          <div className="w-px h-10 bg-border/50"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Missions</span>
            <span className="text-2xl font-black text-foreground font-mono">{totalCompleted}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((badge, i) => (
          <div key={i} className={`mecha-panel p-6 border-2 transition-all duration-300 ${badge.unlocked ? 'border-primary shadow-[4px_4px_0px_rgba(28,61,138,0.4)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(28,61,138,0.6)]' : 'border-muted opacity-60 grayscale'}`}>
            <div className={`w-14 h-14 flex items-center justify-center mb-4 border-2 ${badge.unlocked ? 'border-primary shadow-[4px_4px_0px_rgba(251,191,36,1)]' : 'border-muted'} ${badge.unlocked ? badge.color : 'bg-muted'} ${badge.textColor}`}>
              <badge.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold uppercase mb-2 text-foreground">{badge.title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{badge.description}</p>
            
            {!badge.unlocked && (
              <div className="mt-4 text-xs font-bold uppercase text-accent tracking-wider flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                [ LOCKED ]
              </div>
            )}
            {badge.unlocked && (
              <div className="mt-4 text-xs font-bold uppercase text-primary tracking-wider flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-2 shadow-[0_0_5px_rgba(251,191,36,0.8)]"></span>
                [ UNLOCKED ]
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

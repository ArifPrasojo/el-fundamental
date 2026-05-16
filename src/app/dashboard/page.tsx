import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, Trophy, Flame } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Ready to continue your coding journey?</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Days</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up to earn the 7-day badge!</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Trophy className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 XP</div>
            <p className="text-xs text-muted-foreground mt-1">Top 15% of learners this week</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">✓</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 / 48</div>
            <p className="text-xs text-muted-foreground mt-1">25% overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <Card className="glass-card border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl font-bold text-white">JS</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Module 3</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">JavaScript Fundamentals</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Functions & Scope</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 max-w-md">
                    <Progress value={65} className="h-2" />
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <Button size="lg" className="w-full md:w-auto shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
                <Play className="mr-2 w-4 h-4 fill-current" /> Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

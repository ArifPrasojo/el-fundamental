import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2 } from "lucide-react";
import { signIn } from "@/auth";
import { registerUser } from "@/actions/auth";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="mecha-panel w-full max-w-md p-8 relative shadow-[12px_12px_0px_rgba(251,191,36,0.5)]">
        
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold tracking-widest border-2 border-accent shadow-[2px_2px_0px_rgba(224,26,34,1)] mb-6">
            /// NEW_PILOT_REGISTRATION
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight uppercase text-primary">Pilot Enrollment</h1>
          <p className="text-sm font-medium text-foreground mt-2 max-w-[250px]">
            Establish your credentials to access the training facility.
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <form
            action={async (formData) => {
              "use server";
              const result = await registerUser(formData);
              
              if (result.success) {
                // Automatically log them in after registration
                try {
                  await signIn("credentials", {
                    email: formData.get("email"),
                    password: formData.get("password"),
                    redirectTo: "/dashboard",
                  });
                } catch (e) {
                  // Ignore Next.js redirect error
                  throw e;
                }
              } else {
                redirect(`/register?error=${encodeURIComponent(result.error as string)}`);
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold uppercase text-xs tracking-wider text-primary">Callsign (Full Name)</Label>
              <Input id="name" name="name" type="text" placeholder="Maverick" required className="border-2 border-border rounded-none focus-visible:ring-primary focus-visible:border-primary font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold uppercase text-xs tracking-wider text-primary">Comms Link (Email)</Label>
              <Input id="email" name="email" type="email" placeholder="pilot@elfundamental.io" required className="border-2 border-border rounded-none focus-visible:ring-primary focus-visible:border-primary font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold uppercase text-xs tracking-wider text-primary">Security Key (Password)</Label>
              <Input id="password" name="password" type="password" required className="border-2 border-border rounded-none focus-visible:ring-primary focus-visible:border-primary font-mono text-sm" minLength={6} />
            </div>
            <Button type="submit" className="w-full h-12 mt-4 font-bold uppercase tracking-widest rounded-none border-2 border-accent bg-accent text-accent-foreground hover:bg-accent/90 shadow-[6px_6px_0px_rgba(224,26,34,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(224,26,34,1)] transition-all">
              Establish Record
            </Button>
          </form>

          <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest mt-6 mb-6">
            <span className="bg-background px-4 text-muted-foreground">Alternative Protocols</span>
          </div>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button variant="outline" className="w-full h-12 border-2 border-border font-bold uppercase tracking-widest rounded-none bg-background hover:bg-primary/10 shadow-[4px_4px_0px_rgba(251,191,36,0.3)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(251,191,36,0.3)] transition-all" type="submit">
              <svg viewBox="0 0 24 24" className="mr-2 w-5 h-5" aria-hidden="true">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              Enroll with Google
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm font-medium border-t-2 border-border pt-6">
          Existing Pilot?{" "}
          <Link href="/login" className="text-primary uppercase font-bold hover:underline tracking-wider">
            Login Access
          </Link>
        </div>
      </div>
    </div>
  );
}

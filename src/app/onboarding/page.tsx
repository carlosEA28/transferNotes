
import Link from "next/link";
import { ArrowRight, NotepadText, SquareKanban } from "lucide-react";

import OnboardingProviderGrid, {
  type OnboardingProvider,
} from "@/src/app/onboarding/components/onboarding-provider-grid";
import {authClient} from "@/src/lib/auth-client";
import {redirect} from "next/navigation";
import {auth} from "@/src/lib/auth";
import {headers} from "next/headers";

const providers: OnboardingProvider[] = [
  {
    id: "notion",
    name: "Notion",
    icon: NotepadText,
    href: "/dashboard?provider=notion",
  },
  {
    id: "trello",
    name: "Trello",
    icon: SquareKanban,
    href: "/dashboard?provider=trello",
  },
];

const Onboarding = async  () => {


    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signUp");
    }
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101114] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(45,62,121,0.22),transparent_42%),radial-gradient(circle_at_92%_78%,rgba(191,115,57,0.2),transparent_48%)]" />

      <section className="relative w-full max-w-5xl border border-white/5 bg-[#131417]/95 px-5 py-10 shadow-[0_20px_90px_rgba(0,0,0,0.55)] sm:px-10 sm:py-12">
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-5 rounded-full border border-white/10 bg-[#1B1D22] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#8F92A5] uppercase">
            Passo 2: configuração
          </span>
          <h1 className="text-balance text-4xl font-black tracking-tight text-[#E5E2E1] sm:text-6xl">
            Vamos Começar
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#A7A9B5] sm:text-base">
            Conecte ao seu primeiro provedor e comece a migrar, ou explore o dashboard para conhecer a ferramenta.
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          <OnboardingProviderGrid providers={providers} />
        </div>

        <div className="mt-9 flex justify-center">
          <Link
            className="inline-flex items-center gap-2 text-xs text-[#9B9EAE] transition-colors hover:text-[#C8CBDA]"
            href="/dashboard"
          >
            Pular por agora, me leve ao dashboard
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Onboarding;

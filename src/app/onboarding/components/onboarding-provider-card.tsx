import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type OnboardingProvider = {
  id: string;
  name: string;
  icon: LucideIcon;
  ctaLabel?: string;
  href?: string;
};

type OnboardingProviderCardProps = {
  provider: OnboardingProvider;
  className?: string;
};

const OnboardingProviderCard = ({
  provider,
  className,
}: OnboardingProviderCardProps) => {
  const Icon = provider.icon;

  return (
    <Card
      className={cn(
        "border border-white/5 bg-[#2A2B2F] py-5 text-[#E5E2E1] shadow-none ring-0",
        className
      )}
    >
      <CardHeader className="justify-items-center gap-3 px-5 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-sm bg-[#0E0F13] text-[#EFF2FF]">
          <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </div>
        <CardTitle className="text-center text-base font-semibold tracking-tight text-[#E5E2E1]">
          {provider.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pt-1">
        {provider.href ? (
          <Button
            asChild
            className="h-10 w-full rounded-sm bg-[#101217] text-xs font-semibold text-[#BCC9FF] hover:bg-[#161925]"
          >
            <Link href={provider.href}>{provider.ctaLabel ?? "Connect"}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            className="h-10 w-full rounded-sm bg-[#101217] text-xs font-semibold text-[#BCC9FF] hover:bg-[#161925]"
          >
            {provider.ctaLabel ?? "Connect"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export { OnboardingProviderCard };

import { OnboardingProviderCard, type OnboardingProvider } from "@/src/app/onboarding/components/onboarding-provider-card";

type OnboardingProviderGridProps = {
  providers: OnboardingProvider[];
};

const OnboardingProviderGrid = ({ providers }: OnboardingProviderGridProps) => {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
      {providers.map((provider) => (
        <OnboardingProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default OnboardingProviderGrid;
export type { OnboardingProvider };

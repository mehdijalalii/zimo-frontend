import FadeIn from '@/components/animations/FadeIn';
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren';

interface HomeHowItWorksProps {
  translations: {
    how_it_works: {
      kicker: string;
      heading: string;
      steps: { number: string; title: string; description: string }[];
    };
  };
}

export default function HomeHowItWorks({ translations }: HomeHowItWorksProps) {
  const { how_it_works } = translations;

  return (
    <section className="section-block">
      <div className="mx-auto max-w-6xl">
        <FadeIn direction="up" className="mb-12 text-center">
          <p className="section-kicker mx-auto">{how_it_works.kicker}</p>
          <h2 className="section-heading section-heading--center">
            {how_it_works.heading}
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.15} className="grid gap-12 md:grid-cols-3 md:gap-8">
          {how_it_works.steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#841474] text-2xl font-bold text-white shadow-lg shadow-[#841474]/20">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

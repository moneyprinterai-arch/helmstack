import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Features } from "@/components/features";
import { WorkflowSection } from "@/components/workflow-section";
import { IntegrationsGrid } from "@/components/integrations-grid";
import { Testimonial } from "@/components/testimonial";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <MarketingNav />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <WorkflowSection />
        <IntegrationsGrid />
        <Testimonial />
        <CTA />
      </main>
      <MarketingFooter />
    </>
  );
}

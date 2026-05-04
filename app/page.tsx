import { SiteFrame } from "@/components/layout/SiteFrame";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { AuditSection } from "@/components/sections/AuditSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CollaborationSection } from "@/components/sections/CollaborationSection";
import { DiagnosisSection } from "@/components/sections/DiagnosisSection";
import { DiagnosticsDiagramSection } from "@/components/sections/DiagnosticsDiagramSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SystemSection } from "@/components/sections/SystemSection";

export default function Home() {
  return (
    <SiteFrame>
      <HeroSection />
      <DiagnosisSection />
      <ApproachSection />
      <FounderSection />
      <SystemSection />
      <DiagnosticsDiagramSection />
      <CollaborationSection />
      <ProcessSection />
      <CaseStudiesSection />
      <FAQSection />
      <AuditSection />
    </SiteFrame>
  );
}
"use client";

import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { faqItems } from "@/data/faq";
import { sectionCopy } from "@/data/pageCopy";

export function FAQSection() {
  return (
    <SectionShell id="clarity" sx={{ background: "rgba(11,14,17,0.36)" }}>
      <Stack spacing={4} sx={{ maxWidth: 860, mx: "auto" }}>
        <SectionHeader {...sectionCopy.clarity} align="center" maxWidth={760} />
        <Stack spacing={1}>
          {faqItems.map((item) => (
            <Accordion key={item.number} disableGutters elevation={0} sx={{ border: "1px solid var(--border)", borderRadius: "var(--radius) !important", background: "rgba(16,20,25,0.82)", overflow: "hidden", "&::before": { display: "none" } }}>
              <AccordionSummary aria-controls={`faq-${item.number}-content`} id={`faq-${item.number}-header`} sx={{ minHeight: 64 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "100%" }}>
                  <MetaLabel sx={{ color: "var(--signal-blue)", minWidth: 44 }}>Q-{item.number}</MetaLabel>
                  <Typography sx={{ flex: 1, fontSize: { xs: 15.5, md: 17 } }}>{item.question}</Typography>
                  <Box sx={{ display: { xs: "none", sm: "block" }, color: "var(--text-3)", fontFamily: "var(--mono)", fontSize: 11 }}>{item.label}</Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails id={`faq-${item.number}-content`} sx={{ borderTop: "1px solid var(--border)", px: { xs: 2, md: 3 }, py: 2 }}>
                <Typography sx={{ color: "var(--text-2)", lineHeight: 1.65 }}>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>
    </SectionShell>
  );
}
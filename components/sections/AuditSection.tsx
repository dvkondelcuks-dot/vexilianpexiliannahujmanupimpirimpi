"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { Button, Form, Input, Select } from "antd";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { AuditFlowBackground } from "@/components/visual/AuditFlowBackground";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { SignalChip } from "@/components/ui/SignalChip";
import { sectionCopy } from "@/data/pageCopy";

const receive = [
  "30-minūšu saruna ar arhitektu, ne pārdevēju",
  "Sākotnējais audits: kur šobrīd plīst plūsma",
  "Risku un iespēju saraksts PDF formātā",
  "Skaidra atbilde: vai tev ir vajadzīga sistēma"
];

const chips = ["Instagram leads disappear", "No attribution", "Excel CRM", "No follow-up", "Unclear booking flow"];

export function AuditSection() {
  return (
    <SectionShell id="audits" sx={{ background: "linear-gradient(180deg, rgba(11,14,17,0.3), rgba(7,9,11,0.9))" }}>
      <Grid container spacing={{ xs: 4, lg: 6 }} alignItems="start" sx={{ position: "relative" }}>
        <AuditFlowBackground />
        <Grid size={{ xs: 12, lg: 5 }} sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={3}>
            <SectionHeader {...sectionCopy.audits} />
            <Box className="industrial-card" sx={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "rgba(16,20,25,0.82)", p: 2.2 }}>
              <MetaLabel>Ko tu saņem</MetaLabel>
              <Stack component="ul" spacing={1.2} sx={{ pl: 0, m: 0, mt: 1.5, listStyle: "none" }}>
                {receive.map((item) => (
                  <Stack key={item} component="li" direction="row" spacing={1.2} alignItems="flex-start">
                    <Box sx={{ mt: 0.9, width: 6, height: 6, borderRadius: "50%", background: "var(--signal-green)", flex: "0 0 auto" }} />
                    <Typography sx={{ color: "var(--text-2)", lineHeight: 1.55 }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
            <Box className="industrial-card" sx={{ border: "1px solid rgba(59,255,124,0.18)", borderRadius: "var(--radius)", background: "rgba(59,255,124,0.045)", p: 2.2 }}>
              <MetaLabel>Diskrētums</MetaLabel>
              <Typography sx={{ color: "var(--text-2)", mt: 1, lineHeight: 1.65 }}>Viss, ko tu pasaki sarunā, paliek starp mums. NDA pēc pieprasījuma. Nekas netiek publicēts bez saskaņošanas.</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }} sx={{ position: "relative", zIndex: 1 }}>
          <Box className="industrial-card" sx={{ border: "1px solid var(--border-strong)", borderRadius: "var(--radius)", background: "rgba(16,20,25,0.94)", p: { xs: 2, md: 3 }, boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>
            <Stack spacing={2.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <MetaLabel sx={{ color: "var(--signal-blue)" }}>AUDIT REQUEST / VEX-2026</MetaLabel>
                <SignalChip tone="green">OPEN</SignalChip>
              </Stack>
              <Form layout="vertical" requiredMark={false} onFinish={() => undefined}>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Form.Item label="Vārds, uzvārds" name="name" rules={[{ required: true, message: "Ievadi vārdu un uzvārdu." }]}>
                      <Input autoComplete="name" />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Form.Item label="Uzņēmums" name="company" rules={[{ required: true, message: "Ievadi uzņēmuma nosaukumu." }]}>
                      <Input autoComplete="organization" />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Form.Item label="E-pasts" name="email" rules={[{ required: true, message: "Ievadi e-pastu." }, { type: "email", message: "Ievadi derīgu e-pastu." }]}>
                      <Input autoComplete="email" />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Form.Item label="Tālrunis" name="phone" rules={[{ required: true, message: "Ievadi tālruņa numuru." }]}>
                      <Input autoComplete="tel" />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Form.Item label="Tīmekļa vietne" name="website">
                      <Input placeholder="https://" autoComplete="url" />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Form.Item label="Nozare" name="industry" rules={[{ required: true, message: "Izvēlies nozari." }]}>
                      <Select placeholder="Izvēlies" options={["Pakalpojumi", "Retail", "Viesmīlība", "Ražošana", "B2B", "Cits"].map((value) => ({ value, label: value }))} />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Form.Item label="Mēneša mārketinga budžets" name="budget">
                      <Select placeholder="Izvēlies diapazonu" options={["līdz €1 000", "€1 000 – €3 000", "€3 000 – €7 000", "€7 000+", "nav skaidrs"].map((value) => ({ value, label: value }))} />
                    </Form.Item>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Form.Item label="BREAKPOINT DESCRIPTION / Kur tev šobrīd plīst plūsma?" name="breakpoint" rules={[{ required: true, message: "Apraksti, kur šobrīd plīst plūsma." }]}>
                      <Input.TextArea
                        rows={6}
                        placeholder="Piemēram: klienti raksta Instagram, bet pazūd; nezinu, kura reklāma strādā; nav vienotas vietas pierakstiem; pieprasījumi paliek WhatsApp; pēc pirmā kontakta nav turpinājuma."
                      />
                    </Form.Item>
                  </Grid>
                </Grid>
                <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.8} sx={{ mb: 2 }} rowGap={1}>
                  {chips.map((chip) => <SignalChip key={chip} tone="amber">{chip}</SignalChip>)}
                </Stack>
                <Button htmlType="submit" type="primary" size="large" block>
                  Pieteikt auditu →
                </Button>
              </Form>
              <MetaLabel>Atbildam 24h laikā darba dienās · bez automātiskām ziņām · NDA pēc pieprasījuma</MetaLabel>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </SectionShell>
  );
}
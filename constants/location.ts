export const KENYA_LOCATIONS = [
  { id: "ke-nbi-nairobi-cbd", name: "Nairobi CBD", county: "Nairobi" },
  { id: "ke-mks-mlolongo", name: "Mlolongo", county: "Machakos" },
  { id: "ke-mku-mtito-andei", name: "Mtito Andei", county: "Makueni" },
  { id: "ke-tav-voi", name: "Voi", county: "Taita Taveta" },
  { id: "ke-msa-mombasa-cbd", name: "Mombasa CBD", county: "Mombasa" },
] as const;

export type LocationId = (typeof KENYA_LOCATIONS)[number]["id"];

export const PERSONA_PRESETS = [
  {
    id: "cfo-arthur",
    name: "Arthur Pendelton",
    title: "Chief Financial Officer (CFO)",
    company: "Apex Capital Ledger",
    industry: "Financial Tech",
    difficulty: "Hard",
    temperament: "Analytical & highly skeptical",
    objectionStyle: "Extremely cost-conscious, demands strict ROI proofs, hates sales jargon",
    companySize: "Enterprise",
    buyUrgency: "Low",
    interestLevel: "Low",
    additionalContext: "Very protective of corporate budgets. Wants hard numbers showing how this choice cuts expenses or directly generates revenue within 3 months.",
    avatarBg: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    avatarIcon: "💼"
  },
  {
    id: "cto-david",
    name: "David Chen",
    title: "Chief Technology Officer (CTO)",
    company: "MedGuard Systems",
    industry: "Healthcare / HealthTech",
    difficulty: "Hard",
    temperament: "Direct, technical, & cautious",
    objectionStyle: "Deep security, compliance, integration specs, and API uptime doubts",
    companySize: "Enterprise",
    buyUrgency: "Medium",
    interestLevel: "Medium",
    additionalContext: "Ex-software architect. Highly suspicious of marketing fluff. Needs assurance on HIPAA/GDPR compliance, custom SSO integrations, and API rate limits.",
    avatarBg: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    avatarIcon: "🔒"
  },
  {
    id: "marketing-sarah",
    name: "Sarah Jenkins",
    title: "VP of Marketing",
    company: "Bloom Commerce",
    industry: "Retail / E-commerce",
    difficulty: "Easy",
    temperament: "Friendly, enthusiastic, but distracted",
    objectionStyle: "Concerned about employee learning curves and team onboarding time",
    companySize: "Mid-market",
    buyUrgency: "High",
    interestLevel: "High",
    additionalContext: "Needs to launch campaigns fast. Open to modern software but worries her creative staff will struggle to adopt a complex interface.",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    avatarIcon: "🚀"
  },
  {
    id: "procurement-linda",
    name: "Linda Mercer",
    title: "Director of Procurement",
    company: "Titan Heavy Industries",
    industry: "Logistics",
    difficulty: "Medium",
    temperament: "Risk-averse & highly procedural",
    objectionStyle: "Demands pilot trials, case studies, and long contract term flexibility",
    companySize: "Enterprise",
    buyUrgency: "Low",
    interestLevel: "Medium",
    additionalContext: "Strictly follows corporate vendor onboarding processes. Worries about vendor lock-in and wants reference cases from companies of similar scale.",
    avatarBg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    avatarIcon: "📄"
  }
];

export const INDUSTRIES = [
  "Software/SaaS",
  "Healthcare/Biotech",
  "Financial Technology",
  "Hospitality/Leisure",
  "Retail/E-commerce",
  "Logistics & Heavy Industries",
  "Cybersecurity",
  "Education/EdTech"
];

export const TEMPERAMENTS = [
  "Analytical & skeptical",
  "Friendly, busy, but distracted",
  "Direct, impatient, and tech-savvy",
  "Cautious, detail-oriented, and slow",
  "Aggressive, competitive, and demanding"
];

export const OBJECTION_STYLES = [
  "High cost sensitivity / ROI demand",
  "Onboarding lag and team training hours",
  "Data privacy, security, and SSO integration specs",
  "Skepticism of vendor stability and client reviews",
  "Preference to build internally instead of buy"
];

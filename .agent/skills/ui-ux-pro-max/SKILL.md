---
name: UI/UX Pro Max
description: AI-powered design intelligence for building professional UI/UX across multiple platforms with 67 styles, 96 color palettes, 100 reasoning rules, and intelligent design system generation
---

# UI/UX Pro Max Skill

An AI skill that provides comprehensive design intelligence for building professional UI/UX across multiple platforms and frameworks.

## 🎯 Core Capabilities

### Intelligent Design System Generation
This skill's flagship feature is the **Design System Generator** - an AI-powered reasoning engine that analyzes project requirements and generates complete, tailored design systems in seconds.

**The system performs:**
1. **Multi-Domain Search** (5 parallel searches):
   - Product type matching (100 categories)
   - Style recommendations (67 styles)
   - Color palette selection (96 palettes)
   - Landing page patterns (24 patterns)
   - Typography pairing (57 font combinations)

2. **Reasoning Engine**:
   - Match product → UI category rules
   - Apply style priorities (BM25 ranking)
   - Filter anti-patterns for industry
   - Process decision rules (JSON conditions)

3. **Complete Design System Output**:
   - Pattern + Style + Colors + Typography + Effects
   - Anti-patterns to avoid
   - Pre-delivery checklist

### 100 Industry-Specific Reasoning Rules

The skill includes specialized rules for:

- **Tech & SaaS**: SaaS, Micro SaaS, B2B Enterprise, Developer Tools, AI/Chatbot Platform
- **Finance**: Fintech, Banking, Crypto, Insurance, Trading Dashboard
- **Healthcare**: Medical Clinic, Pharmacy, Dental, Veterinary, Mental Health
- **E-commerce**: General, Luxury, Marketplace, Subscription Box
- **Services**: Beauty/Spa, Restaurant, Hotel, Legal, Consulting
- **Creative**: Portfolio, Agency, Photography, Gaming, Music Streaming
- **Emerging Tech**: Web3/NFT, Spatial Computing, Quantum Computing, Autonomous Systems

Each rule includes:
- Recommended Pattern (landing page structure)
- Style Priority (best matching UI styles)
- Color Mood (industry-appropriate palettes)
- Typography Mood (font personality matching)
- Key Effects (animations and interactions)
- Anti-Patterns (what NOT to do)

## 📚 Design Resources

### 67 UI Styles
- **General Styles (49)**: Glassmorphism, Claymorphism, Minimalism, Brutalism, Neumorphism, Bento Grid, Dark Mode, AI-Native UI, and more
- **Landing Page Styles (8)**: Hero-Centric, Conversion-Optimized, Feature-Rich, Social Proof-Focused, etc.
- **BI/Analytics Dashboard Styles (10)**: Data-Dense, Heat Map, Executive Dashboard, Real-Time Monitoring, etc.

### 96 Color Palettes
Industry-specific palettes for SaaS, E-commerce, Healthcare, Fintech, Beauty, and more.

### 57 Font Pairings
Curated typography combinations with Google Fonts imports.

### 25 Chart Types
Recommendations for dashboards and analytics.

### 13 Tech Stacks
React, Next.js, Astro, Vue, Nuxt.js, Nuxt UI, Svelte, SwiftUI, React Native, Flutter, HTML+Tailwind, shadcn/ui, Jetpack Compose.

### 99 UX Guidelines
Best practices, anti-patterns, and accessibility rules.

## 🚀 How to Use This Skill

### Automatic Activation
This skill activates automatically when you request UI/UX work. Just chat naturally:

```
Build a landing page for my SaaS product
Create a dashboard for healthcare analytics
Design a portfolio website with dark mode
Make a mobile app UI for e-commerce
Build a fintech banking app with dark theme
```

### Design System Generation

To generate a complete design system for your project, use the search script:

```bash
# Generate design system with ASCII output
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"

# Generate with Markdown output
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -f markdown

# Domain-specific search
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart

# Stack-specific guidelines
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
```

### Persist Design System (Master + Overrides Pattern)

Save your design system to files for hierarchical retrieval across sessions:

```bash
# Generate and persist to design-system/MASTER.md
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp"

# Also create a page-specific override file
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp" --page "dashboard"
```

This creates a `design-system/` folder structure:
```
design-system/
├── MASTER.md           # Global Source of Truth (colors, typography, spacing, components)
└── pages/
    └── dashboard.md    # Page-specific overrides (only deviations from Master)
```

## 🎨 Workflow

When a user requests UI/UX work:

1. **Analyze the request** - Identify product type, industry, and requirements
2. **Generate design system** - Run the search script to get tailored recommendations
3. **Apply recommendations** - Use the generated style, colors, typography, and patterns
4. **Implement with best practices**:
   - No emojis as icons (use SVG: Heroicons/Lucide)
   - cursor-pointer on all clickable elements
   - Hover states with smooth transitions (150-300ms)
   - Light mode: text contrast 4.5:1 minimum
   - Focus states visible for keyboard nav
   - prefers-reduced-motion respected
   - Responsive: 375px, 768px, 1024px, 1440px
5. **Validate against anti-patterns** - Ensure the design avoids industry-specific pitfalls

## 🛠️ Supported Stacks

| Category | Stacks |
|----------|--------|
| **Web (HTML)** | HTML + Tailwind (default) |
| **React Ecosystem** | React, Next.js, shadcn/ui |
| **Vue Ecosystem** | Vue, Nuxt.js, Nuxt UI |
| **Other Web** | Svelte, Astro |
| **iOS** | SwiftUI |
| **Android** | Jetpack Compose |
| **Cross-Platform** | React Native, Flutter |

## 📋 Pre-Delivery Checklist

Always validate against this checklist before delivering UI/UX work:

- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Industry-specific anti-patterns avoided
- [ ] Color palette matches product category
- [ ] Typography pairing is appropriate
- [ ] Animations and effects enhance UX

## 📖 Data Files

The skill includes comprehensive CSV databases:

- `data/styles.csv` - 67 UI styles with keywords, best-for, and guidelines
- `data/colors.csv` - 96 color palettes with hex codes and use cases
- `data/typography.csv` - 57 font pairings with Google Fonts links
- `data/products.csv` - 100 product categories with UI recommendations
- `data/landing.csv` - 24 landing page patterns
- `data/charts.csv` - 25 chart type recommendations
- `data/ui-reasoning.csv` - 100 industry-specific reasoning rules
- `data/ux-guidelines.csv` - 99 UX best practices
- `data/stacks/` - Stack-specific guidelines for 13 frameworks

## 🎯 Example Output

When you request "Build a landing page for a beauty spa", the skill generates:

```
TARGET: Serenity Spa - RECOMMENDED DESIGN SYSTEM

PATTERN: Hero-Centric + Social Proof
  Conversion: Emotion-driven with trust elements
  CTA: Above fold, repeated after testimonials
  Sections: Hero → Services → Testimonials → Booking → Contact

STYLE: Soft UI Evolution
  Keywords: Soft shadows, subtle depth, calming, premium feel, organic shapes
  Best For: Wellness, beauty, lifestyle brands, premium services
  Performance: Excellent | Accessibility: WCAG AA

COLORS:
  Primary:    #E8B4B8 (Soft Pink)
  Secondary:  #A8D5BA (Sage Green)
  CTA:        #D4AF37 (Gold)
  Background: #FFF5F5 (Warm White)
  Text:       #2D3436 (Charcoal)

TYPOGRAPHY: Cormorant Garamond / Montserrat
  Mood: Elegant, calming, sophisticated
  Best For: Luxury brands, wellness, beauty, editorial

KEY EFFECTS:
  Soft shadows + Smooth transitions (200-300ms) + Gentle hover states

AVOID (Anti-patterns):
  Bright neon colors + Harsh animations + Dark mode + AI purple/pink gradients
```

## 🔧 Prerequisites

- Python 3.x is required for the search script
- All data files are included in the skill directory
- No additional dependencies needed

## 📝 Notes

- The skill automatically activates for UI/UX requests
- Design systems are generated based on product type and industry
- All recommendations follow accessibility standards (WCAG AA)
- Stack-specific guidelines ensure framework best practices
- Anti-patterns help avoid common industry-specific mistakes

---

**Source**: [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
**License**: MIT
**Version**: 2.0+

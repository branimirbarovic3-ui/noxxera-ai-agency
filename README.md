<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Noxxera AI Agency

This contains everything you need to run your app locally, plus integrated UI/UX design intelligence.

View your app in AI Studio: https://ai.studio/apps/drive/1ZU93oj0udKTHbpMMr8g3_rKIROtkwZxm

## 🎨 UI/UX Pro Max Skill Integration

This project includes the **UI/UX Pro Max** skill - an AI-powered design intelligence system with:

- **67 UI Styles** (Glassmorphism, Minimalism, Dark Mode, AI-Native UI, etc.)
- **96 Color Palettes** (Industry-specific)
- **57 Font Pairings** (Curated typography)
- **100 Reasoning Rules** (Industry-specific design system generation)
- **13 Tech Stacks** (React, Next.js, Vue, Flutter, SwiftUI, etc.)

### Quick Start with UI/UX Skill

Generate a design system for your project:

```bash
# Generate design system
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "your product type" --design-system -p "YourAppName"

# Example: SaaS dashboard
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system -p "Noxxera"

# Example: E-commerce site
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "e-commerce fashion" --design-system -p "Noxxera"
```

Or just chat naturally with Antigravity:
```
Build a landing page for my AI agency
Create a dashboard for analytics
Design a portfolio website with dark mode
```

The skill will automatically activate and provide tailored design recommendations!

## Run Locally

**Prerequisites:**  Node.js, Python 3.x


1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## 📚 Documentation

- **UI/UX Skill Guide**: [.agent/skills/ui-ux-pro-max/SKILL.md](.agent/skills/ui-ux-pro-max/SKILL.md)
- **Original Skill Repo**: [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

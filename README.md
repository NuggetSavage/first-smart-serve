# First SmartServe 

**Field Operations Intelligence Platform — Clickable Prototype**

A fully interactive SaaS demo prototype for First Legal's internal process serving operations. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no backend required.

---

## What This Is

SmartServe AI is an operational intelligence layer designed for legal process serving companies. It helps operations managers, dispatchers, and process servers coordinate service attempts, monitor field activity, optimize routes, and provide real-time visibility into legal service operations.

This prototype is a **clickable mock demo** using sample data. It is designed to demonstrate product vision to executives and stakeholders — not a production application.

---

## Pages Included

| Page | Description |
|---|---|
| Dashboard | Live KPI cards, interactive field map, activity feed, AI insights |
| Service Jobs | Sortable, filterable table of all active service jobs |
| Job Detail | Full defendant info, server profile, attempt timeline, proof of service |
| Field Map | Interactive pin map with server locations and dispatch queue |
| Route Optimization | AI-optimized route sequences with probability scores |
| Servers | Performance table and leaderboard for all process servers |
| Analytics | Charts: success rate trend, regional failures, workload, job volume |
| Documents | Searchable document center for POS, affidavits, and photos |
| AI Assistant | Chat interface with contextual AI responses using mock data |
| Settings | Salesforce/DealRoom integration status and notification toggles |

---

## How to Open Locally

No setup required. Just open the file in any modern browser:

1. Download or clone this repository
2. Open `index.html` directly in Chrome, Safari, Firefox, or Edge

```bash
# If you have Python installed, you can also serve it locally:
cd first-legal-smartserve
python3 -m http.server 8080
# Then open http://localhost:8080 in your browser
```

---

## How to Deploy on GitHub Pages

1. **Create a GitHub repository** (public or private with Pages enabled)

2. **Upload all four files** to the root of the repository:
   ```
   index.html
   style.css
   script.js
   README.md
   ```

3. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Under "Source", select **Deploy from a branch**
   - Set branch to `main` (or `master`) and folder to `/ (root)`
   - Click Save

4. **Your site will be live at:**
   ```
   https://yourusername.github.io/first-legal-smartserve/
   ```

GitHub Pages typically takes 1–2 minutes to deploy after pushing changes.

---

## File Structure

```
first-legal-smartserve/
├── index.html    ← Main HTML — all pages and modals
├── style.css     ← All styles, design tokens, responsive rules
├── script.js     ← All interactions, charts, AI chat, mock data
└── README.md     ← This file
```

---

## Technical Notes

- **No dependencies to install** — Chart.js and Google Fonts load from CDN
- **No backend** — all data is mock data defined in `script.js`
- **No build step** — edit files directly and refresh the browser
- **Responsive** — works on desktop, tablet, and mobile (hamburger nav on mobile)
- **Browser support** — Chrome, Safari, Firefox, Edge (modern versions)

---

## Mock Data

All data in this prototype is sample data for demonstration purposes only. It includes:

- 6 mock service jobs (Smith v Johnson, Hernandez v City, Rivera v Bayshore, etc.)
- 6 mock process servers (Torres, Kim, Lee, Nguyen, Rivera, Wilson)
- Simulated AI chat responses for 7 prompt categories
- Simulated KPI metrics, chart data, and activity feed events

No real case information, defendant data, or personally identifiable information is used.

---

## Design System

| Token | Value |
|---|---|
| Primary Navy | `#0B2E59` |
| Gold Accent | `#D4AF37` |
| Success Green | `#16A34A` |
| Warning Amber | `#F59E0B` |
| Critical Red | `#DC2626` |
| Font | Inter (Google Fonts) |

---

## Prototype Disclaimer

This is a clickable prototype built for executive demonstration purposes. It uses simulated data and does not connect to Salesforce, DealRoom, or any live system. All interactions produce mock responses.

---

*First Legal SmartServe AI — Prototype v1.0*

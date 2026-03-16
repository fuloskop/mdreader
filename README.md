# MD Reader

Privacy-first Markdown reader. Drop your `.md` files and read them with beautiful typography. Your files never leave your browser.

## Features

- **Zero data collection** -- no API calls, no cookies, no analytics, no tracking
- **100% client-side** -- files are read with the browser's FileReader API
- **6 reading themes** -- Paper White, Sepia, Sage, Soft Dark, OLED Dark, Dusk
- **18 languages** -- auto-detects browser language
- **Resizable content width** -- drag the side handles to adjust
- **Multi-file tabs** -- open multiple markdown files at once
- **Drag & drop** -- drop files anywhere on the page
- **GFM support** -- tables, strikethrough, task lists, and more
- **Static export** -- deployed as plain HTML/CSS/JS on Vercel

## Reading Themes

| Theme | Type | Best For |
|-------|------|----------|
| Paper White | Light | Bright environments, general use |
| Sepia | Light | Long reading sessions, blue light reduction |
| Sage | Light | Extended reading, scientifically reduces eye fatigue |
| Soft Dark | Dark | Dim rooms, evening reading |
| OLED Dark | Dark | OLED screens, battery savings |
| Dusk | Dark | Evening/lamp-lit reading |

All themes are based on reading ergonomics research -- proper contrast ratios, WCAG AA+ compliance, and reduced eye strain for extended reading sessions.

## Tech Stack

- Next.js (static export)
- React Markdown + remark-gfm
- Tailwind CSS + Typography plugin
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and import on [Vercel](https://vercel.com). No configuration needed.

## License

MIT

# LookMD

**[lookmd.dev](https://lookmd.dev)** -- Privacy-first Markdown reader. Drop your `.md` files and read them with beautiful typography. Your files never leave your browser.

## Features

- **Zero data collection** -- no API calls, no cookies, no analytics, no tracking
- **100% client-side** -- files are read with the browser's FileReader API, nothing is sent to a server
- **Ctrl+V paste support** -- paste files or raw markdown text directly
- **Drag & drop** -- drop files anywhere on the page
- **6 reading themes** -- Paper White, Sepia, Sage, Soft Dark, OLED Dark, Dusk
- **18 languages** -- auto-detects browser language
- **Resizable content width** -- drag the side handles to adjust reading width
- **Multi-file tabs** -- open and switch between multiple markdown files
- **GFM support** -- tables, strikethrough, task lists, code blocks, and more

## Reading Themes

All themes are based on reading ergonomics research -- proper contrast ratios, WCAG AA+ compliance, and reduced eye strain for extended reading sessions.

| Theme | Type | Best For |
|-------|------|----------|
| Paper White | Light | Bright environments, general use |
| Sepia | Light | Long reading sessions, blue light reduction |
| Sage | Light | Extended reading, scientifically reduces eye fatigue |
| Soft Dark (default) | Dark | Dim rooms, evening reading |
| OLED Dark | Dark | OLED screens, battery savings |
| Dusk | Dark | Evening/lamp-lit reading |

## Privacy

This site collects **zero** user data. No cookies, no analytics, no third-party scripts. All file processing happens entirely in the browser using the FileReader API. You can verify this by inspecting the source code or your browser's network tab.

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

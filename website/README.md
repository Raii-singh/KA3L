# KA3L Web Platform

The interactive web experience for the KA3L Open Machine Architecture.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5
- **3D Graphics:** Three.js + React Three Fiber + @react-three/drei
- **Styling:** Tailwind CSS + Custom Dark Industrial CSS Tokens
- **Sound Effects:** Custom Web Audio API manager with debounced single-shot triggers
- **Typography:** Geist & Geist Mono

## Project Layout

```
website/
├── public/                  # Static assets & audio files
├── src/
│   ├── app/                 # Next.js App Router (horizontal scroll manifesto + spec routes)
│   ├── components/
│   │   ├── story/           # Interactive architectural story visualizers
│   │   ├── ui/              # Glassmorphic containers & navigation
│   │   └── viz/             # Three.js 3D WebGL scenes & background canvas
│   ├── lib/                 # Core content definitions & audio manager
│   └── types/               # TypeScript interfaces
└── package.json
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

<!-- rev: 056 -->

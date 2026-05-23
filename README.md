# National Treasure: Nic Cage Bingo

> *"I'm going to steal the Declaration of Independence... and then play bingo."*

A cinematic bingo card for your *National Treasure* watch party. Every card is randomly shuffled from 35 hand-crafted squares — Freemason references, hairline acting, Riley's jokes that land for nobody. First to get five in a row wins the treasure.

**[Play it live →](https://davidbradway.github.io/nic-cage-bingo/)**

---

## Screenshot

![Nic Cage Bingo screenshot](screenshot.png)

---

## Tech Stack

| | |
|---|---|
| [React 18](https://react.dev/) | UI & state |
| [Vite 5](https://vitejs.dev/) | Dev server & bundler |
| [GitHub Pages](https://pages.github.com/) | Hosting via GitHub Actions |

No build-time dependencies beyond React itself — all styling is inline.

---

## How to Play

1. Open the app on your phone or laptop before pressing play.
2. Click **New Card** to get a freshly shuffled 5×5 board. The center square is a free Nic Cage face — it's already marked.
3. Watch the movie. When something on your card happens on screen, tap that square to stamp it.
4. First person to fill a row, column, or diagonal shouts **BINGO** and basks in the golden glow of victory (confetti included).
5. Hit **New Card** between films for a fresh board.

---

## Local Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

---

## Deployment

Deployment is fully automated. Pushing to `main` triggers the GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the app and publishes the `dist/` folder to GitHub Pages.

**One-time setup** (do this once in your repo settings):

1. Go to **Settings → Pages**.
2. Set **Source** to *GitHub Actions*.
3. Push to `main` — the workflow handles the rest.

To trigger a deploy manually, go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

## License

MIT — steal freely. Ben Gates would approve.

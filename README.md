# Title: TBD

A continuous-scroll photographic essay built with Next.js and React.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Media Optimization:** Next/Image, HTML5 Video with IntersectionObserver

## Features
* **Optimized Video Rendering:** Videos utilize `preload="metadata"` and `IntersectionObserver` to trigger playback *only* when visible in the viewport, aggressively saving mobile bandwidth and ensuring instant page loads.
* **Lego-Block Architecture:** The entire site is mapped from a single, strongly-typed JSON array in `page.tsx`, allowing for effortless reordering and combination of text, images, and videos.
* **Bilingual Support:** Includes a toggle for English and Cebuano reading experiences.

## media specifications
To maintain performance and layout integrity across all devices, media adheres to the following strict guidelines:
* **Aspect Ratios:** 3:2 for all horizontal media, 3:4 for all vertical media. 
* **Participant Media:** All participant photos and videos utilize a signature off-white border with copyright attributions.
* **Video Size:** `.mp4` format, compressed to under 10MB per file.
* **Audio:** All inline layout videos are muted by default to adhere to modern browser autoplay policies and preserve the reading experience.

```bash
npm install
npm run dev
```

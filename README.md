# Dragon Boat Atelier

An original interactive, parametric dragon boat study for RedNote. Static, browser-only Three.js, with all runtime dependencies bundled locally. No accounts, analytics, external APIs, remote fonts or runtime CDN.

Open `examples/dragon-boat/` through any static HTTP server. The root page redirects to the example. On a local computer:

    python3 -m http.server 8000

Then visit `http://localhost:8000`.

## Features
- Length, beam and rocker sliders with metre values
- Open hull shell, 18 U-shaped framing ribs and ten two-person paddler benches
- Original sculptural dragon head, tail, drum and steering sweep
- Orbit/zoom, perspective/side/top views, translucent framing view
- Reset, PNG export (SVG in compatibility mode), English and Chinese UI, responsive layout
- Automatic interactive SVG compatibility renderer when WebGL is unavailable
- No build needed for deployment; vendored Three.js 0.180.0 and MIT notice included

## Validation

    npm test

Geometry tests cover all 27 combinations of minimum/default/maximum dimensions, finite positions, index bounds, port/starboard and longitudinal symmetry, rocker rise and inner-shell clearance. Camera tests additionally cover 36 viewport/length/preset combinations, including portrait screens. Browser review is separately documented in the handoff.

## Design basis and limits
The default hull is 12.49 m long by 1.16 m wide, inspired by standard 20-paddler racing boats. Ten benches, a shallow open canoe profile, a drummer at the bow and a stern steering sweep distinguish this from a generic canoe. Rib spacing, rocker range and carved ornaments are original illustrative choices, not IDBF manufacturing specifications. Custom settings are visual design studies, not construction plans, stability predictions or certification.

References: International Dragon Boat Federation https://www.dragonboat.sport/ ; Plastex standard dragon boat https://www.plastexboats.com/ . No reference photographs are redistributed.

## Publication

The user approved a public source repository and public playable GitHub Pages demo. The app contains no private user data. Deploy static files only; exclude node_modules, development caches and local review artifacts.

## Dependencies
Third-party Three.js is MIT-licensed; see `examples/dragon-boat/vendor/THREE-LICENSE.txt`. This project does not grant a separate public license to its original source.

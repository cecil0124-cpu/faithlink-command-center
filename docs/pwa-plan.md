# PWA Plan

Progressive Web App support means FaithLink Command Center can eventually be installed from a browser and opened like an app.

## Current Status

- Manifest prepared.
- Mobile layout improved.
- Placeholder SVG app icon added.
- No service worker is connected yet.
- No offline app shell is cached yet.

## Future Step

- Add a service worker for a simple offline shell.
- Add production PNG icons: `icon-192.png` and `icon-512.png`.
- Test install behavior after Firebase Hosting or another static host is ready.

## LocalStorage Warning

FaithLink still stores data in browser localStorage. Data remains browser-specific and device-specific until Firebase sync is connected.

Export a backup before clearing browser data, switching devices, reinstalling the app, or testing a new browser.

## Install Notes

- Chrome/Edge desktop: use the install icon in the address bar or browser menu when available.
- Android Chrome/Edge: use browser menu, then Add to Home screen or Install app.
- Safari iOS: use Share, then Add to Home Screen.
- Safari macOS: use Add to Dock if available on supported versions.

Install behavior may vary while running from local development URLs.

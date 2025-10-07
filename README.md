# Voice for Nature — Wadden (Frontend)

A Vue 3 + Vuetify 3 single-page app (SPA) that lets users “meet” Wadden Sea ecosystem elements (e.g., seagrass) through full-bleed, image-driven pages. The current prototype focuses on a clean, scalable front-end with two layout “frames,” a gallery landing page, and per-element pages. AI/chat is now integrated via a web component.

---

## Tech stack

* Vue 3 (Composition API, `<script setup>`)
* Vuetify 3 (UI framework)
* Vite (dev server & bundler)
* Vue Router + file-based routes (`unplugin-vue-router`)
* Layouts (`vite-plugin-vue-layouts`)
* Pinia (state management, used for shared data like items)
* [deep-chat](https://deepchat.dev/) (web component chat UI)

---

## Quick start

```bash
# install deps
npm install

# run dev server (Vite will print the local URL)
npm run dev

# production build
npm run build

# preview built app locally
npm run preview
```

---

## Project structure

```
project/
├─ public/
│  ├─ bg/                    # full-bleed background images (served as /bg/…)
│  └─ assets/
│     └─ items.json          # ecosystem items data (id, title, image, etc.)
├─ src/
│  ├─ App.vue                # single <v-app> + <router-view/>
│  ├─ main.js                # boot, plugins, mount (registers deep-chat as custom element)
│  ├─ plugins/
│  │  ├─ index.js            # registers router, pinia, vuetify
│  │  └─ vuetify.js          # Vuetify setup (theme/components)
│  ├─ router/
│  │  └─ index.js            # createRouter + file-based routes + layouts
│  ├─ layouts/
│  │  ├─ default.vue         # app-bar layout (top bar)
│  │  └─ FullBleedLayout.vue # chrome-less layout (edge-to-edge content)
│  ├─ components/
│  │  ├─ AppTopBar.vue       # simple app bar with a Home/Gallery button
│  │  └─ ChatComponent.vue   # wrapper for deep-chat web component
│  ├─ pages/
│  │  ├─ HomePage.vue        # landing "gallery" over WaddenSea background
│  │  └─ ItemPage.vue        # per-ecosystem page (dynamic route)
│  ├─ stores/                # Pinia stores (app store loads items.json)
│  └─ styles/                # (optional) global styles, if needed
└─ README.md
```

---

## How routing & layouts work

This project uses **file-based routing** and **automatic layouts** :

* Routes are generated from `src/pages/*.vue` by `unplugin-vue-router`.
* Dynamic ecosystem pages are handled by `ItemPage.vue` and a dynamic route (`/item/:id`).
* Layouts are ordinary Vue components in `src/layouts/`. The layouts plugin wraps pages automatically, and **the layout component must render `<RouterView/>`** in its template to show the page.

**App-level rule:** there must be exactly **one** `<v-app>` (Vuetify root) in the app, provided by `src/App.vue`. Layouts must *not* include `<v-app>`.

---

## Data management

* **Ecosystem items** (id, title, image, etc.) are stored in `public/assets/items.json`.
* The `app` Pinia store (`src/stores/app.js`) loads `items.json` once and exposes it to all components.
* Components access items via the store, e.g.:
  ```js
  import { useAppStore } from '@/stores/app'
  const appStore = useAppStore()
  await appStore.loadItems()
  // use appStore.items
  ```

---

## Chat integration

* The chat UI uses the [deep-chat](https://deepchat.dev/) web component, wrapped in `ChatComponent.vue`.
* The chat window is centered and sized responsively using viewport units and CSS.
* The chat background is semi-transparent so the ecosystem background image is visible.
* Vue is configured to recognize `<deep-chat>` as a custom element (see `main.js` and/or `vite.config.mjs`).

---

## Current pages & layouts

### 1) `pages/HomePage.vue` — Landing “Gallery”

* **Layout:** `FullBleedLayout` (edge-to-edge canvas, no top bar).
* **Background:** `public/bg/waddensea.jpg`
* **Content:** a gallery overlay (`<v-item-group>`) of tiles, each representing an ecosystem item from `items.json`. Clicking a tile navigates to the corresponding `/item/:id` page.

### 2) `pages/ItemPage.vue` — Ecosystem page (Dynamic)

* **Layout:** `default` (top bar visible).
* **Background:** per-item, loaded from `items.json` (e.g., `public/bg/seagrass.jpg`).
* **Content:** centered chat window (`deep-chat`), with introduction/history loaded from the item data.

---

## Adding a new ecosystem item

1. **Add background + preview** to `public/bg/` (e.g., `shellfish.jpg`).
2. **Add an entry** to `public/assets/items.json`:
   ```json
   {
     "id": "shellfish",
     "title": "Shellfish",
     "img": "bg/shellfish.jpg",
     "introduction": "Hello! I'm a shellfish. Ask me anything!"
   }
   ```
3. **No need to create a new page file** — the dynamic route `/item/:id` handled by `ItemPage.vue` will automatically display the new item.

---

## Conventions & guidelines

* **One `<v-app>`** : only in `App.vue`. Layouts must not nest another `<v-app>`.
* **Layouts** : must render `<RouterView/>` to display the wrapped page.
* **Pages** : use `definePage({ name, path?, meta: { layout } })`.
* **Styling** : prefer `scoped` styles; share small utilities via a global stylesheet if needed.
* **Assets** :
  * Backgrounds & large, static images → `public/bg/` then use `import.meta.env.BASE_URL + 'bg/...'`.
  * Data (items) → `public/assets/items.json`, loaded via the Pinia store.
* **Web components** : Register custom elements (like `deep-chat`) in `main.js` or `vite.config.mjs` so Vue doesn't warn.
* **State** : Pinia is used for shared state (e.g., items).

---

## Dev notes & troubleshooting

* **Hot reload & auto-routes** : The router is exposed to HMR in `router/index.js`.
* **Dynamic import workaround** : The scaffold includes a reload path for transient “Failed to fetch dynamically imported module” issues during dev.
* **First-load redirect** : The app currently shows a real home page (`/`).
* **Sass** : Vuetify styles require Sass. If you ever see a request for raw `.sass` files in Network (e.g., `VApp.sass`), ensure `sass` is installed and Vuetify styles are imported once.

---

## Roadmap (suggested)

* Add left/right navigation arrows on ecosystem pages (prev/next by index).
* Add more chat features and AI integration.
* Lazy-load background images; add small preview thumbs for faster first paint.

---

## License

MIT (project code).

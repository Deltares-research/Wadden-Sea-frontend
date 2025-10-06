
# Voice for Nature — Wadden (Frontend)

A Vue 3 + Vuetify 3 single-page app (SPA) that lets users “meet” Wadden Sea ecosystem elements (e.g., seagrass) through full-bleed, image-driven pages. The current prototype focuses on a clean, scalable front-end with two layout “frames,” a gallery landing page, and per-element pages. AI/chat will be added later.

---

## Tech stack

* Vue 3 (Composition API, `<script setup>`)
* Vuetify 3 (UI framework)
* Vite (dev server & bundler)
* Vue Router + file-based routes (`unplugin-vue-router`)
* Layouts (`vite-plugin-vue-layouts`)
* Pinia (wired; reserved for future state)

---

## Quick start

<pre class="overflow-visible!" data-start="675" data-end="854"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span># install deps</span><span>
npm install

</span><span># run dev server (Vite will print the local URL)</span><span>
npm run dev

</span><span># production build</span><span>
npm run build

</span><span># preview built app locally</span><span>
npm run preview
</span></span></code></div></div></pre>

---

## Project structure

<pre class="overflow-visible!" data-start="1015" data-end="2040"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>project/
├─ </span><span>public</span><span>/
│  └─ bg/                       </span><span># full-bleed background images (served as /bg/…)</span><span>
├─ src/
│  ├─ App.vue                   </span><span># single <v-app> + <router-view/></span><span>
│  ├─ main.js                   </span><span># boot, plugins, mount</span><span>
│  ├─ plugins/
│  │  ├─ index.js               </span><span># registers router, pinia, vuetify</span><span>
│  │  └─ vuetify.js             </span><span># Vuetify setup (theme/components)</span><span>
│  ├─ router/
│  │  └─ index.js               </span><span># createRouter + file-based routes + layouts</span><span>
│  ├─ layouts/
│  │  ├─ </span><span>default</span><span>.vue            </span><span># app-bar layout (top bar)</span><span>
│  │  └─ FullBleedLayout.vue    </span><span># chrome-less layout (edge-to-edge content)</span><span>
│  ├─ components/
│  │  └─ AppTopBar.vue          </span><span># simple <v-app-bar> with a Home/Gallery button</span><span>
│  ├─ pages/
│  │  ├─ index.vue              </span><span># landing "gallery" over WaddenSea background</span><span>
│  │  └─ seagrass.vue           </span><span># per-ecosystem page (seagrass)</span><span>
│  ├─ stores/                   </span><span># Pinia (future global state)</span><span>
│  └─ styles/                   </span><span># (optional) global styles, if needed</span><span>
└─ README.md
</span></span></code></div></div></pre>

---

## How routing & layouts work

This project uses **file-based routing** and  **automatic layouts** :

* Routes are generated from `src/pages/*.vue` by `unplugin-vue-router`.
* A page declares its route & layout via the `definePage()` macro:
  <pre class="overflow-visible!" data-start="2288" data-end="2435"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>definePage</span><span>({
    </span><span>name</span><span>: </span><span>'seagrass'</span><span>,
    </span><span>path</span><span>: </span><span>'/seagrass'</span><span>,
    </span><span>meta</span><span>: { </span><span>layout</span><span>: </span><span>'default'</span><span> }, </span><span>// wraps with src/layouts/default.vue</span><span>
  })
  </span></span></code></div></div></pre>
* Layouts are ordinary Vue components in `src/layouts/`. The layouts plugin wraps pages automatically, and **the layout component must render `<RouterView/>`** in its template to show the page.

**App-level rule:** there must be exactly **one** `<v-app>` (Vuetify root) in the app, provided by `src/App.vue`. Layouts must *not* include `<v-app>`.

---

## Current pages & layouts

### 1) `pages/index.vue` — Landing “Gallery”

* **Layout:** `FullBleedLayout` (edge-to-edge canvas, no top bar).
* **Background:** `public/bg/waddensea.jpg`, applied with:
  <pre class="overflow-visible!" data-start="2990" data-end="3063"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>const</span><span> bgUrl = </span><span>import</span><span>.</span><span>meta</span><span>.</span><span>env</span><span>.</span><span>BASE_URL</span><span> + </span><span>'bg/waddensea.jpg'</span><span>
  </span></span></code></div></div></pre>
* **Content:** a gallery overlay (`<v-item-group>`) of tiles. Each tile:
  * Displays a preview image (from `public/bg/...`)
  * Has a **ring** around it (`.ring-wrap`) to float over the background
  * Navigates to the target page on click

Key snippet:

<pre class="overflow-visible!" data-start="3318" data-end="3970"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-html"><span><span><v-item-group</span><span></span><span>v-model</span><span>=</span><span>"selected"</span><span></span><span>class</span><span>=</span><span>"gallery-overlay"</span><span></span><span>mandatory</span><span>>
  </span><span><v-container</span><span></span><span>class</span><span>=</span><span>"py-12"</span><span>>
    </span><span><v-row</span><span></span><span>dense</span><span>>
      </span><span><v-col</span><span></span><span>v-for</span><span>=</span><span>"item in items"</span><span></span><span>:key</span><span>=</span><span>"item.id"</span><span></span><span>cols</span><span>=</span><span>"12"</span><span></span><span>sm</span><span>=</span><span>"6"</span><span></span><span>md</span><span>=</span><span>"4"</span><span></span><span>lg</span><span>=</span><span>"3"</span><span>>
        </span><span><v-item</span><span></span><span>:value</span><span>=</span><span>"item.id"</span><span></span><span>v-slot</span><span>=</span><span>"{ toggle }"</span><span>>
          </span><span><div</span><span></span><span>class</span><span>=</span><span>"ring-wrap"</span><span>>
            </span><span><v-card</span><span></span><span>elevation</span><span>=</span><span>"8"</span><span></span><span>class</span><span>=</span><span>"gallery-card"</span><span> @</span><span>click</span><span>=</span><span>"() => { toggle(); go(item) }"</span><span>>
              </span><span><v-img</span><span></span><span>:src</span><span>=</span><span>"item.img"</span><span></span><span>height</span><span>=</span><span>"180"</span><span></span><span>cover</span><span>>
                </span><span><div</span><span></span><span>class</span><span>=</span><span>"card-title"</span><span>>{{ item.title }}</span><span></div</span><span>>
              </span><span></v-img</span><span>>
            </span><span></v-card</span><span>>
          </span><span></div</span><span>>
        </span><span></v-item</span><span>>
      </span><span></v-col</span><span>>
    </span><span></v-row</span><span>>
  </span><span></v-container</span><span>>
</span><span></v-item-group</span><span>>
</span></span></code></div></div></pre>

**The ring effect** (outside the image) is a spread `box-shadow` on `.ring-wrap`:

<pre class="overflow-visible!" data-start="4054" data-end="4363"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-css"><span><span>.ring-wrap</span><span> {
  </span><span>border-radius</span><span>: </span><span>14px</span><span>;
  </span><span>box-shadow</span><span>: </span><span>0</span><span></span><span>0</span><span></span><span>10px</span><span></span><span>16px</span><span></span><span>rgba</span><span>(</span><span>0</span><span>,</span><span>0</span><span>,</span><span>0</span><span>,.</span><span>6</span><span>), </span><span>0</span><span></span><span>12px</span><span></span><span>28px</span><span></span><span>rgba</span><span>(</span><span>0</span><span>,</span><span>0</span><span>,</span><span>0</span><span>,.</span><span>35</span><span>);
  </span><span>transition</span><span>: box-shadow .</span><span>18s</span><span> ease, transform .</span><span>18s</span><span> ease;
}
</span><span>.ring-wrap</span><span>:hover</span><span> {
  </span><span>box-shadow</span><span>: </span><span>0</span><span></span><span>0</span><span></span><span>10px</span><span></span><span>20px</span><span></span><span>rgba</span><span>(</span><span>255</span><span>,</span><span>255</span><span>,</span><span>255</span><span>,.</span><span>6</span><span>), </span><span>0</span><span></span><span>18px</span><span></span><span>36px</span><span></span><span>rgba</span><span>(</span><span>0</span><span>,</span><span>0</span><span>,</span><span>0</span><span>,.</span><span>45</span><span>);
  </span><span>transform</span><span>: </span><span>translateY</span><span>(-</span><span>2px</span><span>);
}
</span></span></code></div></div></pre>

### 2) `pages/seagrass.vue` — Ecosystem page (Seagrass)

* **Layout:** `default` (top bar visible).
* **Background:** `public/bg/seagrass.jpg`, applied with the same pattern as above.
* Intended to host the speech-bubble/chat content later.

---

## The app bar

`layouts/default.vue` includes `AppTopBar.vue`, a simple Vuetify app bar with brand color `#141e95` and a right-side button that routes to `home`:

<pre class="overflow-visible!" data-start="4775" data-end="5115"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-vue"><span><v-app-bar flat density="comfortable" :style="{ backgroundColor: '#141e95', color: 'white' }">
  <v-app-bar-title>Voice for Nature – Wadden Sea</v-app-bar-title>
  <v-spacer />
  <v-btn icon variant="text" :to="{ name: 'home' }" aria-label="Open gallery" class="text-white">
    <v-icon icon="mdi-grid" />
  </v-btn>
</v-app-bar>
</span></code></div></div></pre>

---

## Background image pattern (consistency)

All background images are referenced relative to the Vite base:

<pre class="overflow-visible!" data-start="5229" data-end="5295"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>const</span><span> bgUrl = </span><span>import</span><span>.</span><span>meta</span><span>.</span><span>env</span><span>.</span><span>BASE_URL</span><span> + </span><span>'bg/<file>.jpg'</span><span>
</span></span></code></div></div></pre>

…and applied via a full-viewport div:

<pre class="overflow-visible!" data-start="5334" data-end="5419"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-html"><span><span><div</span><span></span><span>class</span><span>=</span><span>"scene"</span><span></span><span>:style</span><span>=</span><span>"{ backgroundImage: `url('${bgUrl}')` }"</span><span>></span><span></div</span><span>>
</span></span></code></div></div></pre>

<pre class="overflow-visible!" data-start="5420" data-end="5589"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-css"><span><span>.scene</span><span> {
  </span><span>position</span><span>: fixed;
  </span><span>top</span><span>: </span><span>0</span><span>; </span><span>right</span><span>: </span><span>0</span><span>; </span><span>bottom</span><span>: </span><span>0</span><span>; </span><span>left</span><span>: </span><span>0</span><span>;
  </span><span>background-size</span><span>: cover;
  </span><span>background-position</span><span>: center;
  </span><span>background-repeat</span><span>: no-repeat;
}
</span></span></code></div></div></pre>

**Why `public/bg/`?** Large, static assets don’t need bundling—placing them in `public/` keeps them accessible at `/bg/...` while letting app code remain cache-friendly and small.

---

## Adding a new ecosystem page

1. **Add background + preview** to `public/bg/` (e.g., `shellfish.jpg`).
2. **Create the page** `src/pages/shellfish.vue`:
   <pre class="overflow-visible!" data-start="5936" data-end="6447"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-vue"><span><script setup>
   definePage({
     name: 'shellfish',
     path: '/shellfish',
     meta: { layout: 'default' }, // show app bar on ecosystem pages
   })
   const bgUrl = import.meta.env.BASE_URL + 'bg/shellfish.jpg'
   </script>

   <template>
     <div class="scene" :style="{ backgroundImage: `url('${bgUrl}')` }"></div>
   </template>

   <style scoped>
   .scene { position: fixed; inset: 0; background-size: cover; background-position: center; background-repeat: no-repeat; }
   </style>
   </span></code></div></div></pre>
3. **Add a tile** to the gallery in `pages/index.vue`:
   <pre class="overflow-visible!" data-start="6507" data-end="6752"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>const</span><span> items = [
     { </span><span>id</span><span>: </span><span>'seagrass'</span><span>,  </span><span>title</span><span>: </span><span>'Seagrass'</span><span>,  </span><span>img</span><span>: base + </span><span>'bg/seagrass.jpg'</span><span>,  </span><span>to</span><span>: { </span><span>name</span><span>: </span><span>'seagrass'</span><span> } },
     { </span><span>id</span><span>: </span><span>'shellfish'</span><span>, </span><span>title</span><span>: </span><span>'Shellfish'</span><span>, </span><span>img</span><span>: base + </span><span>'bg/shellfish.jpg'</span><span>, </span><span>to</span><span>: { </span><span>name</span><span>: </span><span>'shellfish'</span><span> } },
   ]
   </span></span></code></div></div></pre>

That’s it—routing and layouts are automatic.

---

## Conventions & guidelines

* **One `<v-app>`** : only in `App.vue`. Layouts must not nest another `<v-app>`.
* **Layouts** : must render `<RouterView/>` to display the wrapped page.
* **Pages** : use `definePage({ name, path?, meta: { layout } })`.
* **Styling** : prefer `scoped` styles; share small utilities via a global stylesheet if needed.
* **Assets** :
  * Backgrounds & large, static images → `public/bg/` then use `import.meta.env.BASE_URL + 'bg/...'`.
  * If you need bundling/optimization per-component, import from `src/assets/…`.
* **Icons** : import MDI font CSS once if not already present.
* **State** : Pinia is registered; introduce stores when multiple components/pages share state (e.g., selected element, gallery data source).

---

## Dev notes & troubleshooting

* **Hot reload & auto-routes** : The router is exposed to HMR in `router/index.js`:

<pre class="overflow-visible!" data-start="7673" data-end="7738"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>if</span><span> (</span><span>import</span><span>.</span><span>meta</span><span>.</span><span>hot</span><span>) </span><span>window</span><span>.</span><span>__VUE_ROUTER__</span><span> = router
  </span></span></code></div></div></pre>

  This reduces spurious HMR warnings during route generation.

* **Dynamic import workaround** : The scaffold includes a reload path for transient “Failed to fetch dynamically imported module” issues during dev (see `router.onError`).
* **First-load redirect** : The app currently shows a real home page (`/`). If you re-introduce an automatic redirect on `/`, prefer a router guard in `router/index.js` or a minimal `index.vue` with `router.replace()` in `onMounted`, and ensure styles compile cleanly on first mount.
* **Sass** : Vuetify styles require Sass. If you ever see a request for raw `.sass` files in Network (e.g., `VApp.sass`), ensure `sass` is installed and Vuetify styles are imported once (either `import 'vuetify/styles'` or via a local SCSS entry).

---

## Roadmap (suggested)

* Centralize “elements” data (id, title, image) in `src/data/elements.js` or a Pinia store.
* Add left/right navigation arrows on ecosystem pages (prev/next by index).
* Add the speech-bubble chat container (UI only for now).
* Lazy-load background images; add small preview thumbs for faster first paint.

---

## License

MIT (project code).

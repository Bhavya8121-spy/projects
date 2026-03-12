# 3D Car Viewer — Bug Fix Guide

## ✅ All Bugs Fixed (11 total)

---

## Critical: Folder Structure

Your project MUST be laid out exactly like this:

```
your-project/
├── public/
│   ├── scene.gltf        ← your model file goes HERE
│   ├── scene.bin         ← must be next to scene.gltf
│   └── textures/         ← texture folder goes HERE
│       └── *.png
├── src/  (or root)
│   ├── app.jsx
│   ├── car.jsx
│   ├── main.jsx
│   └── index.html
├── vite.config.js        ← must be named THIS (not vite_config.js)
└── package.json
```

---

## Bug List & Fixes

### BUG 1 — Canvas had no background color
**File:** `app.jsx`  
The `<div>` wrapping the Canvas had no background. Canvas was transparent, showing a blank white page.  
**Fix:** Added `background: "#1a1a1a"` to the wrapper div style.

---

### BUG 2 — Canvas gl props missing
**File:** `app.jsx`  
Some browsers render a blank canvas without `gl={{ antialias: true }}` and `setClearColor`.  
**Fix:** Added `gl` prop and `onCreated` to set the clear color explicitly.

---

### BUG 3 — Lighting too weak to see the model
**File:** `app.jsx`  
Only one `ambientLight intensity={1}` — many GLTF materials appear black/invisible without directional light.  
**Fix:** Added `hemisphereLight` + two `directionalLight` for proper illumination.

---

### BUG 4 — `fallback={null}` hides loading state
**File:** `app.jsx`  
`<Suspense fallback={null}>` means you see absolutely nothing while the model loads, making it look broken.  
**Fix:** Changed to a visible orange box fallback so you can confirm the scene is working.

---

### BUG 5 — No zoom limits on OrbitControls
**File:** `app.jsx`  
Without `minDistance`/`maxDistance`, the user can zoom through and inside the model, losing it.  
**Fix:** Added `minDistance={2}` and `maxDistance={30}`.

---

### BUG 6 — Wrong model filename path
**File:** `car.jsx`  
`useGLTF("/car.gltf")` — but the Porsche model is named `scene.gltf`, not `car.gltf`.  
**Fix:** Changed to `useGLTF("/scene.gltf")`. Also the file must be in `/public/`.

---

### BUG 7 — Model never centered or scaled
**File:** `car.jsx`  
The raw GLTF model has arbitrary coordinates (e.g. center at x=176, y=-150). Without centering and scaling, the camera points at empty space.  
**Fix:** Added `Box3` bounding box calculation to center the model at origin and scale it to 5 units.

---

### BUG 8 — Shadows and material issues
**File:** `car.jsx`  
Meshes didn't have `castShadow`/`receiveShadow`, and some materials had `side` issues causing invisible faces.  
**Fix:** Added `traverse` loop to fix all mesh materials after load.

---

### BUG 9 — Missing `useGLTF.preload`
**File:** `car.jsx`  
Without preload, the model starts fetching only when the component mounts, causing a longer blank period.  
**Fix:** Added `useGLTF.preload("/scene.gltf")` at the bottom of the file.

---

### BUG 10 — Body background was white
**File:** `index.html`  
Default white body background shows through during load.  
**Fix:** Set `body { background: #1a1a1a }` and `#root` to full viewport size.

---

### BUG 11 — Wrong config filename
**File:** `vite_config.js` → should be `vite.config.js`  
Vite **only** looks for `vite.config.js`. A file named `vite_config.js` is completely ignored, so the React plugin never loads and JSX fails to compile.  
**Fix:** Renamed to `vite.config.js`. Also added `assetsInclude` for `.gltf/.glb/.bin` files.

---

## How to Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

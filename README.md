<p align="center">
  <img src="./docs/m.svg" alt="Matter M logo" width="90" height="90">
</p>

<h1 align="center">Matter</h1>

<p align="center">Material Components in Pure CSS</p>

<p align="center">This project is work in progress, I am open-sourcing <a href="https://codepen.io/finnhvman/full/zMKagM">Pure CSS Material Components</a>.</p>

![13 Matter Components](./docs/hero.png)

## 🎬 Get Started

Configurable builds, CDN support, and more are coming soon! Right now the process is manual:

1. Download `matter.css` from `dist` folder. (**For experimenting** you can also use it from CDN, **not production grade**: https://res.cloudinary.com/finnhvman/raw/upload/v1550870862/matter/matter-experimental-9.css)
2. Include it in your project or build pipeline
3. Apply the class of your choice:
```html
<!-- Contained Button -->
<button class="matter-button-contained">Button</button>

<!-- Outlined Button -->
<button class="matter-button-outlined">Button</button>

<!-- Text Button -->
<button class="matter-button-text">Button</button>


<!-- Filled Textfield (keep the placeholder attribute as it is) -->
<label class="matter-textfield-filled">
    <input placeholder=" "/>
    <span>Textfield</span>
</label>

<!-- Filled Textfield (textarea) (keep the placeholder attribute as it is) -->
<label class="matter-textfield-filled">
    <textarea placeholder=" "></textarea>
    <span>Textfield</span>
</label>

<!-- etc. -->


<!-- Tooltip (put as first child of the originating component, use unique id on tooltip and the same id for aria-describedby on the originating component) -->
<button class="matter-button-text" aria-describedby="button-tooltip">
    <span id="button-tooltip" class="matter-tooltip" aria-hidden="true"><span>Tooltip</span></span>
    Button
</button>
```

Click the link of a component below to find more examples of its usage in the `.spec.html` file!

## 📦 Components

**Implemented/Planned:**
- [x] Buttons
  - [x] [Contained](./src/components/buttons/contained)
  - [x] [Outlined](./src/components/buttons/outlined)
  - [x] [Text](./src/components/buttons/text)
- [ ] Progress Indicators
  - [ ] Circular
  - [ ] Linear
- [ ] Selection Controls
  - [x] [Checkbox](./src/components/selection/checkbox)
  - [x] [Radio](./src/components/selection/radio)
  - [ ] Switch
- [ ] Slider
- [x] Textfields
  - [x] [Filled](./src/components/textfields/filled)
  - [x] [Outlined](./src/components/textfields/outlined)
  - [x] [Standard](./src/components/textfields/standard)
- [x] [Tooltip](./src/components/tooltips)

## 👋 Who is this for?

**People** who work on:

* Simple projects
* Internal facing tools
* Framework-less apps
* Javascript-less apps
* Proof of Concept and demo projects

**Newcomers** to web development who want to build nice UIs quick and easy. 

This is **not** for complex apps and SPAs. Rather use the following libraries in case of larger projects: 
* [Material-UI (React)](https://github.com/mui-org/material-ui)
* [Vuetify](https://github.com/vuetifyjs/vuetify)
* [Material Design for Angular](https://github.com/angular/material2)
* [Material Components Web](https://github.com/material-components/material-components-web)

## 🌐 Browser Support

<p align="center">
  <img src="./docs/browsers.png" alt="Chrome, Firefox, Safari, Edge, Samsung Internet" width="520"><br/>
  <b>Targeted browsers</b>: Chrome, Firefox, Safari<br/>
  <b>Supported browsers</b>: Edge, Samsung Internet
</p>

Matter components are well-covered with **Visual Feature Tests** (**VFTs**). Visual Feature Tests verify certain visual parts of components like: dominant color, shape of corners (rounded/sharp), types of edges (outlined or not), shadows, and more. VFTs are executed for every component in various states (like hover, focus, active, etc. and their permutations) in the three targeted browsers.

VFTs are not executed for the rest of the supported browsers, however best effort manual testing is performed to ensure operability and display.

## 🤔 Philosophy

The purpose of Matter is to provide the most easy-to-use but accurate implementation of [Material Design Components](https://material.io/design/guidelines-overview/).  

Matter has probably the lowest entry-barrier among Material Design Component libraries. The only technical knowledge needed to use it is basic HTML5. It doesn't rely on JavaScript, it only needs one to three HTML elements and a CSS class per component to work. The markup of the components is semantic by design.

Matter is built with theming in mind. Its components can be customized by specifying certain colors and/or fonts. The granularity of customization is variable: components can be themed on global level, component level, component instance level, or on any level between.

💎 Matter is solid. All the components are tested thoroughly to ensure rock-solid quality across all targeted browsers.

💧 Matter is liquid. Components can be resized fluidly to match layout needs, otherwise they take up the size necessary.

🎈 Matter is gas. It's highly compressible so delivery can be performed in compact formats like gzip or brotli.
  
⚡️ Matter is plasma. It's just CSS relying almost exclusively on class selectors making it lightning fast.

## 💬 Contact

If you have questions, feedback or anything to share related to the project, then you can contact me via:
- Twitter [@finnhvman](https://twitter.com/finnhvman)
- Spectrum [@finnhvman](https://spectrum.chat/users/finnhvman)
- or [submit an issue](https://github.com/finnhvman/matter/issues)

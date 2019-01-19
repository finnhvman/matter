<p align="center">
  <img src="./docs/m.svg" alt="Matter M logo" width="90" height="90">
</p>

<h1 align="center">Matter</h1>

<p align="center">Material Components in Pure CSS</p>

<p align="center">This project is work in progress, I am open-sourcing <a href="https://codepen.io/finnhvman/full/zMKagM">Pure CSS Material Components</a>.</p>

## 🎬 Get Started

Configurable builds, CDN support, and more are coming soon! Right now the process is manual:

1. Download `matter.css` from `dist` folder. (**For experimenting** you can also use it from CDN, **not production grade**: https://res.cloudinary.com/finnhvman/raw/upload/v1547920822/matter/matter-experimental-2.css)
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


<!-- Tooltip (use a div to wrap component) -->
<div class="matter-tooltip" aria-label="Tooltip">
    <button class="matter-button-text">Button</button>
</div>
```

Click the link of a component below to find more examples of its usage in the `.spec.html` file!

## 🧩 Components

![13 Matter Components](./docs/hero.png)

**Implemented/Planned:**
- [x] Buttons
  - [x] [Contained](./src/components/buttons/contained)
  - [x] [Outlined](./src/components/buttons/outlined)
  - [x] [Text](./src/components/buttons/text)
- [ ] Progress Indicators
  - [ ] Circular
  - [ ] Linear
- [ ] Selection Controls
  - [ ] Checkbox
  - [x] [Radio Button](./src/components/selection/radio)
  - [ ] Switch
- [ ] Slider
- [x] Text Fields
  - [x] [Filled](./src/components/textfields/filled)
  - [x] [Outlined](./src/components/textfields/outlined)
  - [x] [Standard](./src/components/textfields/standard)
- [x] [Tooltip](./src/components/tooltips)

## 💬 Contact

If you have questions, feedback or anything to share related to the project, then you can contact me via:
- Twitter [@finnhvman](https://twitter.com/finnhvman)
- or [submit an issue](https://github.com/finnhvman/matter/issues)

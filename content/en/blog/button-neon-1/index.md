---
title: "Button Neon HTML & CSS Style 1"
description: "Button Neon use HTML & CSS only style 1."
excerpt: "Button Neon use HTML & CSS only style 1."
date: 2020-05-12T14:20:06+07:00
lastmod: 2023-04-27T16:04:07+07:00
draft: false
weight: 60
images: ["thumbnail.png"]
categories: ["Button"]
tags: ["css", "html", "button", "animation", "neon"]
contributors: ["Sugeng Sulistiyawan"]
pinned: false
homepage: false
---

Button Neon HTML & CSS Style 1.

Button Neon use HTML & CSS only.

---

{{< youtube id="NqpWjYfNCMI" autoplay="true" title="Button Neon HTML & CSS Style 1" >}}

---

### CSS

```css
:root {
  --dark: #030c26;
  --success: #00c853;
  --warning: #ffab00;
  --danger: #d50000;
}

/* .btn */
.btn {
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 2px;
  padding: 10px 18px;
  overflow: hidden;
}

/* .btn.btn-neon */
.btn.btn-neon {
  position: relative;
  display: inline-block;
  border: none;
  background: transparent;
  text-transform: uppercase;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.btn.btn-neon:hover {
  color: #fff !important;
  border-radius: 2px;
  transition: 0.2s;
  transition-delay: 0.8s;
}

.btn.btn-neon > span {
  position: absolute;
  display: block;
}

.btn.btn-neon > span:nth-child(odd) {
  width: 100%;
  height: 2px;
}

.btn.btn-neon > span:nth-child(even) {
  width: 2px;
  height: 100%;
}

.btn.btn-neon > span:nth-child(1) {
  top: 0;
  left: -100%;
}

.btn.btn-neon > span:nth-child(2) {
  right: 0;
  top: -100%;
}

.btn.btn-neon > span:nth-child(3) {
  bottom: 0;
  right: -100%;
}

.btn.btn-neon > span:nth-child(4) {
  left: 0;
  bottom: -100%;
}

.btn.btn-neon:hover > span {
  transition: 0.5s;
}

.btn.btn-neon:hover > span:nth-child(1) {
  left: 100%;
}

.btn.btn-neon:hover > span:nth-child(2) {
  top: 100%;
  transition-delay: 0.2s;
}

.btn.btn-neon:hover > span:nth-child(3) {
  right: 100%;
  transition-delay: 0.4s;
}

.btn.btn-neon:hover > span:nth-child(4) {
  bottom: 100%;
  transition-delay: 0.6s;
}

/* .btn.btn-neon.btn-success */
.btn.btn-neon.btn-success {
  color: var(--success);
}

.btn.btn-neon.btn-success:hover {
  background: var(--success);
  box-shadow: 0 0 10px var(--success), 0 0 20px var(--success),
    0 0 40px var(--success);
}

.btn.btn-neon.btn-success > span:nth-child(1) {
  background: linear-gradient(90deg, transparent, var(--success));
}

.btn.btn-neon.btn-success > span:nth-child(2) {
  background: linear-gradient(180deg, transparent, var(--success));
}

.btn.btn-neon.btn-success > span:nth-child(3) {
  background: linear-gradient(270deg, transparent, var(--success));
}

.btn.btn-neon.btn-success > span:nth-child(4) {
  background: linear-gradient(0deg, transparent, var(--success));
}

/* .btn.btn-neon.btn-warning */
.btn.btn-neon.btn-warning {
  color: var(--warning);
}

.btn.btn-neon.btn-warning:hover {
  background: var(--warning);
  box-shadow: 0 0 10px var(--warning), 0 0 20px var(--warning),
    0 0 40px var(--warning);
}

.btn.btn-neon.btn-warning > span:nth-child(1) {
  background: linear-gradient(90deg, transparent, var(--warning));
}

.btn.btn-neon.btn-warning > span:nth-child(2) {
  background: linear-gradient(180deg, transparent, var(--warning));
}

.btn.btn-neon.btn-warning > span:nth-child(3) {
  background: linear-gradient(270deg, transparent, var(--warning));
}

.btn.btn-neon.btn-warning > span:nth-child(4) {
  background: linear-gradient(0deg, transparent, var(--warning));
}

/* .btn.btn-neon.btn-danger */
.btn.btn-neon.btn-danger {
  color: var(--danger);
}

.btn.btn-neon.btn-danger:hover {
  background: var(--danger);
  box-shadow: 0 0 10px var(--danger), 0 0 20px var(--danger),
    0 0 40px var(--danger);
}

.btn.btn-neon.btn-danger > span:nth-child(1) {
  background: linear-gradient(90deg, transparent, var(--danger));
}

.btn.btn-neon.btn-danger > span:nth-child(2) {
  background: linear-gradient(180deg, transparent, var(--danger));
}

.btn.btn-neon.btn-danger > span:nth-child(3) {
  background: linear-gradient(270deg, transparent, var(--danger));
}

.btn.btn-neon.btn-danger > span:nth-child(4) {
  background: linear-gradient(0deg, transparent, var(--danger));
}

/* Just For Demo */
html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 10px;
}
```

### HTML

```html
<a href="#" class="btn btn-neon btn-success">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Neon Success
</a>
<a href="#" class="btn btn-neon btn-warning">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Neon Warning
</a>
<a href="#" class="btn btn-neon btn-danger">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Neon Danger
</a>
```

#### Demo & Preview:

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-slug-hash="eYPRpZN" data-user="wanforge" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wanforge/pen/eYPRpZN">
  Button Neon 1</a> by Sugeng Sulistiyawan (<a href="https://codepen.io/wanforge">@wanforge</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

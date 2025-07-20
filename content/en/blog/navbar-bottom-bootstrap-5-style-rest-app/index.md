---
title: "Navbar Bottom Bootstrap 5 - Style REST App"
description: "Navbar Bottom Example Bootstrap 5 Style REST Application."
excerpt: "Navbar Bottom Example Bootstrap 5 Style REST Application."
date: 2023-04-27T15:50:51+07:00
lastmod: 2023-04-27T15:50:55+07:00
draft: false
weight: 60
images: ["thumbnail.png"]
categories: ["Bootstrap"]
tags: ["scss", "css", "bootstrap", "bootstrap 5", "menu", "bottom menu", "responsive", "navbar"]
contributors: ["Sugeng Sulistiyawan"]
pinned: false
homepage: false
---

Navbar Bottom Example Bootstrap 5 Style REST Application

### CSS (SCSS)

```scss
$color-start: #fc466b;
$color-end: #3f5efb;

$icon-height: 2.5rem;
$icon-padding: 0.25rem;

.navbar.fixed-bottom {
  .nav-link {
    .nav-icon {
      text-align: center;
      height: $icon-height;
      padding: $icon-padding;
      border-radius: $icon-height / 2;
      svg {
        height: $icon-height - 2 * $icon-padding;
      }
    }
  }

  .nav-link.active .nav-icon,
  .nav-link:hover .nav-icon {
    background: $color-start;
    background: linear-gradient(90deg, $color-start 0%, $color-end 100%);
    svg {
      stroke: var(--bs-white);
    }
  }
}
```

### HTML

```html
<!-- Bottom Navbar -->
<nav class="navbar navbar-light bg-light border-top navbar-expand fixed-bottom">
  <ul class="navbar-nav nav-justified w-100">
    <li class="nav-item">
      <a href="#" class="nav-link active">

        <div class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        Home

      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link">

        <div class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        Search

      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link">

        <div class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>
        Add New

      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link">

        <div class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        Stats

      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link position-relative">
        <span class="position-absolute top-25 start-75 translate-top badge rounded-pill bg-danger">
          99+
          <span class="visually-hidden">unread messages</span>
        </span>

        <div class="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        Profile

      </a>
    </li>
  </ul>
</nav>

<!-- Content -->
<div class="container">
  <div class="row">
    <div class="clearfix py-4">

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta, ante a vehicula elementum, turpis odio porttitor diam, et convallis augue ex et nibh. Mauris a eleifend lacus. Donec id felis a ex lacinia ornare at quis ex. Praesent vulputate metus eget ipsum suscipit sollicitudin. Donec vulputate urna sit amet turpis elementum lacinia. Phasellus quis ullamcorper tellus. Nullam nec est enim. Sed ultrices blandit enim sed tincidunt. Donec gravida molestie justo a scelerisque. Donec venenatis eget nunc quis aliquet. Donec id tellus non sapien auctor egestas. Vestibulum id sodales tortor, nec volutpat felis. Vestibulum sed commodo nisl. Vestibulum sit amet cursus mauris, in accumsan nunc. Duis sit amet diam ut ante scelerisque laoreet. Proin eleifend consectetur metus, quis fermentum turpis sodales a.
      </p>
      <p>
        Nulla lacinia est dictum odio imperdiet pharetra. Donec auctor mi sed arcu pharetra, ac semper neque cursus. Sed orci lacus, bibendum lobortis euismod sit amet, ornare in magna. Fusce hendrerit pellentesque nisi quis accumsan. Nunc vel euismod turpis. Nullam massa velit, mattis non finibus in, pretium quis nibh. Duis in euismod diam. Nullam id iaculis metus, quis auctor purus. Quisque malesuada arcu ac augue gravida, id euismod arcu pellentesque.
      </p>
      <p>
        Maecenas dignissim nisl a urna scelerisque, id maximus elit imperdiet. Etiam consectetur tortor eu lorem mattis cursus. Nulla facilisi. Maecenas iaculis ornare elit vitae consequat. Maecenas vel purus quis leo porta ultrices id vel tortor. In vel varius quam. Nam laoreet ac arcu eget tempus. Donec pretium risus in convallis varius. Vestibulum egestas leo mauris, quis commodo odio imperdiet et. Vivamus id lectus vel libero posuere consectetur eget nec elit. Sed ullamcorper ultricies orci, in congue felis suscipit quis. Cras auctor sem nec nunc sodales, vitae congue est hendrerit. In hac habitasse platea dictumst. Cras rutrum efficitur lectus, bibendum rhoncus purus pharetra non.
      </p>
      <p>
        Vivamus in ante justo. Etiam sem augue, imperdiet eu massa at, egestas posuere elit. Integer in enim fringilla, elementum tellus eu, luctus dolor. Ut mattis sit amet metus nec viverra. Donec dolor sapien, blandit non purus vitae, laoreet consequat arcu. Phasellus iaculis justo at tellus ultricies vulputate. Fusce sit amet augue eu magna dapibus sagittis. Quisque elementum orci velit, quis congue sem tempus et. Nam non vehicula lectus.
      </p>
      <p>
        Phasellus et risus vel ante malesuada facilisis quis vel nunc. Sed quam augue, eleifend ac elementum sit amet, ornare nec nunc. Donec sodales arcu mi. Phasellus pharetra metus ex, sed lacinia nunc sagittis eget. Mauris dignissim felis a sapien commodo scelerisque. Fusce pretium volutpat hendrerit. Vestibulum ut mollis magna, sit amet luctus tellus. Mauris vel justo ut diam rhoncus laoreet et at libero. Morbi pharetra nunc vel nibh consequat interdum. Proin molestie, purus efficitur fermentum gravida, purus erat porta diam, id facilisis dui metus at diam.
      </p>

    </div>
  </div>
</div>
```

> - For more details look at [https://getbootstrap.com/docs/5.0/components/navbar/#placement](https://getbootstrap.com/docs/5.0/components/navbar/#placement)
> - For Icon / SVG [https://feathericons.com/](https://feathericons.com/)

#### Demo & Preview:

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-slug-hash="eYPRNPw" data-user="wanforge" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wanforge/pen/eYPRNPw">
  Navbar Bottom Example Bootstrap 5</a> by Sugeng Sulistiyawan (<a href="https://codepen.io/wanforge">@wanforge</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

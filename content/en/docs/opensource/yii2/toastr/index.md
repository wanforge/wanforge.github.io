---
title: "Yii2 Toastr"
description: "Simple flash toastr notifications for Yii2."
lead: "Simple flash toastr notifications for Yii2."
date: 2023-04-06T02:28:26+07:00
lastmod: 2023-04-27T16:42:36+07:00
draft: false
images: []
menu:
  docs:
    parent: "opensource-yii2"
weight: 10
toc: true
---

> [https://github.com/wanforge/yii2-toastr](https://github.com/wanforge/yii2-toastr)

---

> Yii2 Toastr uses [Toastr](https://codeseven.github.io/toastr/) <br> Demo: [https://codeseven.github.io/toastr/demo.html](https://codeseven.github.io/toastr/demo.html)

## Instalation

Package is available on [Packagist](https://packagist.org/packages/diecoding/yii2-toastr), you can install it using [Composer](https://getcomposer.org).

```shell
composer require diecoding/yii2-toastr "^1.0"
```

or add to the require section of your `composer.json` file.

```shell
"diecoding/yii2-toastr": "^1.0"
```

## Dependencies

- PHP 7.4+
- [yiisoft/yii2](https://github.com/yiisoft/yii2)
- [npm-asset/toastr](https://asset-packagist.org/package/npm-asset/toastr)

## Usage

### Layouts/Views

> Add `ToastrFlash` to your layout or view file, example in file `views\layouts\main.php`

#### Layouts/Views Simple Usage

```php
use diecoding\toastr\ToastrFlash;

ToastrFlash::widget();
```

#### Layouts/Views Advanced Usage

```php
use diecoding\toastr\ToastrFlash;

ToastrFlash::widget([
    "typeDefault"       => ToastrFlash::TYPE_INFO,            // (string) default `ToastrFlash::TYPE_INFO`
    "titleDefault"      => "",                                // (string) default `""`
    "messageDefault"    => "",                                // (string) default `""`
    "closeButton"       => false,                             // (bool) default `false`
    "debug"             => false,                             // (bool) default `false`
    "newestOnTop"       => true,                              // (bool) default `true`
    "progressBar"       => true,                              // (bool) default `true`
    "positionClass"     => ToastrFlash::POSITION_TOP_RIGHT,   // (string) default `ToastrFlash::POSITION_TOP_RIGHT`
    "preventDuplicates" => true,                              // (bool) default `true`
    "showDuration"      => 300,                               // (int|null) default `300` in `ms`, `null` for skip
    "hideDuration"      => 1000,                              // (int|null) default `1000` in `ms`, `null` for skip
    "timeOut"           => 5000,                              // (int|null) default `5000` in `ms`, `null` for skip
    "extendedTimeOut"   => 1000,                              // (int|null) default `1000` in `ms`, `null` for skip
    "showEasing"        => "swing",                           // (string) default `swing`, `swing` and `linear` are built into jQuery
    "hideEasing"        => "swing",                           // (string) default `swing`, `swing` and `linear` are built into jQuery
    "showMethod"        => "slideDown",                       // (string) default `slideDown`, `fadeIn`, `slideDown`, and `show` are built into jQuery
    "hideMethod"        => "slideUp",                         // (string) default `slideUp`, `hide`, `fadeOut` and `slideUp` are built into jQuery
    "tapToDismiss"      => true,                              // (bool) default `true`
    "escapeHtml"        => true,                              // (bool) default `true`
    "rtl"               => false,                             // (bool) default `false`
    "skipCoreAssets"    => false,                             // (bool) default `false`, `true` if use custom or external toastr assets
    "options"           => [],                                // (array) default `[]`, Custom Toastr options and override default options
]);
```

### Controllers

> Just use `Yii::$app->session->setFlash($type, $message)` like as usual alert

#### Controllers Simple Usage

```php
Yii::$app->session->setFlash('error', 'Message');
```

or if use multiple flash in same session

```php
Yii::$app->session->setFlash('error', ['Message 1', 'Message 2', 'Message 3']);
```

#### Controllers Advanced Usage

```php
Yii::$app->session->setFlash('error', [['Title', 'Message']]);
```

or if use multiple flash in same session

```php
Yii::$app->session->setFlash('error', [['Title 1', 'Message 1'], ['Title 2', 'Message 2'], ['Title 3', 'Message 3']]);
```

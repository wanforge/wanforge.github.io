---
title: "Yii2 Barcode Generator"
description: "The JavaScript Barcode Generator for Yii2."
lead: "The JavaScript Barcode Generator for Yii2."
date: 2023-04-06T02:28:26+07:00
lastmod: 2023-04-28T10:17:06+07:00
draft: false
images: []
menu:
  docs:
    parent: "opensource-yii2"
weight: 30
toc: true
---

> [https://github.com/wanforge/yii2-barcode-generator](https://github.com/wanforge/yii2-barcode-generator)

---

> Yii2 Barcode Generator uses [JsBarcode](https://lindell.me/JsBarcode/) <br> Demo: [https://lindell.me/JsBarcode/](https://lindell.me/JsBarcode/)

## Instalation

Package is available on [Packagist](https://packagist.org/packages/diecoding/yii2-barcode-generator), you can install it using [Composer](https://getcomposer.org).

```shell
composer require diecoding/yii2-barcode-generator "^1.0"
```

or add to the require section of your `composer.json` file.

```shell
"diecoding/yii2-barcode-generator": "^1.0"
```

## Dependencies

- PHP 7.4+
- [yiisoft/yii2](https://github.com/yiisoft/yii2)
- [npm-asset/jsbarcode](https://asset-packagist.org/package/npm-asset/jsbarcode)

## Usage

> Wiki as JavaScript Code at [https://github.com/lindell/JsBarcode/wiki#barcodes](https://github.com/lindell/JsBarcode/wiki#barcodes)

### Simple Usage

```php
use diecoding\barcode\generator\Barcode;

// CODE128 (auto) is the default mode
Barcode::widget([
  'value' => 'Hi world!',
]);

// CODE128
Barcode::widget([
  'value'  => 'Example1234',
  'format' => Barcode::CODE128
]);

// CODE128A
Barcode::widget([
  'value'  => 'EXAMPLE\n1234',
  'format' => Barcode::CODE128A
]);

// ...

```

### Advanced Usage

```php
use diecoding\barcode\generator\Barcode;

Barcode::widget([
  'value'         => '1234',
  'format'        => Barcode::PHARMACODE,
  'pluginOptions' => [
    'lineColor'    => '#0aa',
    'width'        => 4,
    'height'       => 40,
    'displayValue' => false
  ]
]);

// Enable encoding CODE128 as GS1-128/EAN-128.
Barcode::widget([
  'value'         => '12345678',
  'format'        => Barcode::CODE128C,
  'pluginOptions' => [
    'ean128' => true,
  ]
]);

// Change Element Tag, default svg, available svg, img, canvas
Barcode::widget([
  'tag'           => 'img',
  'value'         => '12345678',
  'format'        => Barcode::CODE128C,
  'pluginOptions' => [
    'ean128' => true,
  ]
]);

// Change Element Tag, add custom style element tag, hide value text
Barcode::widget([
  'tag'     => 'img',
  'value'   => '12345678',
  'options' => [
      'style' => "width: 4cm; height: 1cm;",
  ],
  'pluginOptions' => [
      'displayValue' => false,
  ],
]);

// ...

```

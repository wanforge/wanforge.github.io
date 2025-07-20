---
title: "Yii2 Dropify"
description: "Override your input files with style for Yii2."
lead: "Override your input files with style for Yii2."
date: 2023-04-06T02:28:26+07:00
lastmod: 2023-04-27T16:42:36+07:00
draft: false
images: []
menu:
  docs:
    parent: "opensource-yii2"
weight: 15
toc: true
---

> [https://github.com/wanforge/yii2-dropify](https://github.com/wanforge/yii2-dropify)

---

> Yii2 Dropify uses [Dropify](https://github.com/JeremyFagis/dropify) <br> Demo: [http://jeremyfagis.github.io/dropify](http://jeremyfagis.github.io/dropify)

## Instalation

Package is available on [Packagist](https://packagist.org/packages/diecoding/yii2-dropify), you can install it using [Composer](https://getcomposer.org).

```shell
composer require diecoding/yii2-dropify "^1.0"
```

or add to the require section of your `composer.json` file.

```shell
"diecoding/yii2-dropify": "^1.0"
```

## Dependencies

- PHP 7.4+
- [yiisoft/yii2](https://github.com/yiisoft/yii2)
- [npm-asset/dropify](https://asset-packagist.org/package/npm-asset/dropify)

## Usage

### Forms/Views

```php
use diecoding\dropify\Dropify;

// Simple
echo Dropify::widget([
    'name' => 'image',
]);

// Advanced
echo Dropify::widget([
    'name' => 'image',
    'options' => [
        // options for input widget
    ],
    'pluginOptions' => [
        // options for dropify, as output `$(#options['id']).dropify(pluginOptions);`
        // @see https://github.com/JeremyFagis/dropify#options
    ],
    'imgFileExtensions' = [
        // Animated Portable Network Graphics
        'apng',

        // AV1 Image File Format
        'avif',

        // Graphics Interchange Format
        'gif',

        // Joint Photographic Expert Group image
        'jpeg',
        'jpg',
        'jpeg',
        'jfif',
        'pjpeg',
        'pjp',

        // Portable Network Graphics
        'png',

        // Scalable Vector Graphics
        'svg',

        // Web Picture format
        'webp',

        // Bitmap file
        'bmp',

        // Microsoft Icon
        'ico',
        'cur',

        // Tagged Image File Format
        'tif',
        'tiff',
    ],
    'skipCoreAssets' => false, // (bool) default `false`, `true` if use custom or external dropify assets
]);

// Simple with $model / ActiveField
echo $form->field($model, 'image')->widget(Dropify::class);

// Advanced with $model / ActiveField
echo $form->field($model, 'image')->widget(Dropify::class, [
    'options' => [
        // options for input widget
    ],
    'pluginOptions' => [
        // options for dropify, as output `$(#options['id']).dropify(pluginOptions);`
        // @see https://github.com/JeremyFagis/dropify#options
    ],
    'imgFileExtensions' = [
        // Animated Portable Network Graphics
        'apng',

        // AV1 Image File Format
        'avif',

        // Graphics Interchange Format
        'gif',

        // Joint Photographic Expert Group image
        'jpeg',
        'jpg',
        'jpeg',
        'jfif',
        'pjpeg',
        'pjp',

        // Portable Network Graphics
        'png',

        // Scalable Vector Graphics
        'svg',

        // Web Picture format
        'webp',

        // Bitmap file
        'bmp',

        // Microsoft Icon
        'ico',
        'cur',

        // Tagged Image File Format
        'tif',
        'tiff',
    ],
    'skipCoreAssets' => false, // (bool) default `false`, `true` if use custom or external dropify assets
]);
```

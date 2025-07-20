---
title: "Embedded File Viewer (Google Drive, Office Apps, OneDrive)"
description: "Embedded file viewer: Google Drive, Office Apps, OneDrive."
excerpt: "Embedded file viewer: Google Drive, Office Apps, OneDrive."
date: 2024-01-21T14:09:46+07:00
lastmod: 2024-01-21T14:09:50+07:00
draft: false
weight: 60
images: []
categories: ["Note"]
tags: ["embed", "viewer", "google drive", "office apps", "one drive", "iframe", "microsoft"]
contributors: ["Sugeng Sulistiyawan"]
pinned: false
homepage: false
---

Embedded File Viewer (Google Drive, Office Apps, OneDrive)

## Example from Tiny File Manager

[...tinyfilemanager.php#L1782](https://github.com/prasathmani/tinyfilemanager/blob/8e87afae5b744c3e23490000bf0d398d6d4a749c/tinyfilemanager.php#L1782)

```php
...

if($online_viewer == 'google') {
    echo '<iframe src="https://docs.google.com/viewer?embedded=true&hl=en&url=' . fm_enc($file_url) . '" frameborder="no" style="width:100%;min-height:460px"></iframe>';
} else if($online_viewer == 'microsoft') {
    echo '<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=' . fm_enc($file_url) . '" frameborder="no" style="width:100%;min-height:460px"></iframe>';
}

/**
 * Encode html entities
 * @param string $text
 * @return string
 */
function fm_enc($text)
{
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

...
```

## Office Apps (Microsoft) Viewer

**('.ppt' '.pptx' '.doc', '.docx', '.xls', '.xlsx')**

`https://view.officeapps.live.com/op/embed.aspx?src=[FILE_URL]`

```html
<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=[FILE_URL]" frameborder="no" style="width:100%;min-height:460px"></iframe>
```

### OneDrive Embed Links

**Powerpoint**

```html
<iframe src="https://onedrive.live.com/embed?cid=[C_ID]&authkey=[AUTH_KEY]&em=2" frameborder="no" style="width:100%;min-height:460px" scrolling="no"></iframe>
```

**Excel**

```html
<iframe src="https://onedrive.live.com/embed?cid=[C_ID]&resid=[RES_ID]&authkey=[AUTH_KEY]&em=2" frameborder="no" style="width:100%;min-height:460px" scrolling="no"></iframe>
```

## Google Docs Viewer

Only files under 25 MB can be previewed with the Google Drive viewer.

Google Drive viewer helps you preview over 16 different file types, listed below:

* Image files (.JPEG, .PNG, .GIF, .TIFF, .BMP)
* Video files (WebM, .MPEG4, .3GPP, .MOV, .AVI, .MPEGPS, .WMV, .FLV)
* Text files (.TXT)
* Markup/Code (.CSS, .HTML, .PHP, .C, .CPP, .H, .HPP, .JS)
* Microsoft Word (.DOC and .DOCX)
* Microsoft Excel (.XLS and .XLSX)
* Microsoft PowerPoint (.PPT and .PPTX)
* Adobe Portable Document Format (.PDF)
* Apple Pages (.PAGES)
* Adobe Illustrator (.AI)
* Adobe Photoshop (.PSD)
* Tagged Image File Format (.TIFF)
* Autodesk AutoCad (.DXF)
* Scalable Vector Graphics (.SVG)
* PostScript (.EPS, .PS)
* TrueType (.TTF)
* XML Paper Specification (.XPS)
* Archive file types (.ZIP and .RAR)

### Google Docs Viewer (Apps)

`https://docs.google.com/a/[DOMAIN]/viewer?url=[FILE_URL]`

### Google Docs Viewer

`https://docs.google.com/a/[DOMAIN]/viewer?url=[FILE_URL]`

### Example

`https://docs.google.com/a/wanforge.github.io/file/d/FILE_ID_UNIQUE/edit`

## Google Drive

**Sheets**

```html
<iframe src="https://docs.google.com/spreadsheets/d/FILE_ID_UNIQUE/pubhtml?widget=true&amp;headers=true" frameborder="no" style="width:100%;min-height:460px"></iframe>
```

### Embedded File Viewer

Google Docs offers an undocumented feature that lets you embed PDF files and PowerPoint presentations in a web page. The files don't have to be uploaded to Google Docs, but they need to be available online.

**Google Drive Viewer: Explicit PDF files**

`https://docs.google.com/viewer?url=[FILE_URL]&embedded=true`

```html
<iframe src="https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true" frameborder="no" style="width:100%;min-height:460px"></iframe>
```

```html
<iframe src="https://drive.google.com/viewerng/viewer?url=http://docs.google.com/fileview?id=FILE_ID_UNIQUE&hl=en&pid=explorer&efh=false&a=v&chrome=false&embedded=true" frameborder="no" style="width:100%;min-height:460px"></iframe>
```

**Google Drive Viewer: Non-PDF files (fileviewer URL)**

To view Google Drive docs from fileviewer links, use the file ID as the `srcid` attribute in the iframe.

The file ID for your PDF (one that is already in Google Drive) can be found in the PDFs web address. When you open a PDF, it's the garbage-looking piece of the URL (it will be between forward-slashes, "/").

`https://docs.google.com/a/wanforge.github.io/file/d/FILE_ID_UNIQUE/edit`

* In this case it's the `FILE_ID_UNIQUE` => [ID]
* In this case it's the `wanforge.github.io` => [DOMAIN]

Source: `https://docs.google.com/fileview?id=FILE_ID_UNIQUE&hl=en&pid=explorer&efh=false&a=v&chrome=false&embedded=true`

Or

Source: `https://drive.google.com/file/d/FILE_ID_UNIQUE/view?ddrp=1&hl=en`

Result:

```html
<iframe src="https://docs.google.com/viewer?srcid=[FILE_ID_UNIQUE]&pid=explorer&efh=false&a=v&chrome=false&embedded=true" frameborder="no" style="width:100%;min-height:460px"></iframe>
```

### REAL EXAMPLE USING GOOGLE DRIVE | PDF

```html
<iframe src="https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true&hl=en" frameborder="no" style="width:100%;min-height:460px"></iframe>
```

{{< embed-file src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" viewer="google" >}}

### REAL EXAMPLE USING OFFICE APPS (MICROSOFT) | PPT

```html
<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt' frameborder="no" style="width:100%;min-height:460px"></iframe>
```

{{< embed-file src="https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt" viewer="microsoft" >}}

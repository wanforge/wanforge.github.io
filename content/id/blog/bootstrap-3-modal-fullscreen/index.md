---
title: "Modal Full Screen Bootstrap 3"
description: "Custom ukuran modal bootstrap 3 supaya tampil full screen & responsive."
excerpt: "Custom ukuran modal bootstrap 3 supaya tampil full screen & responsive."
date: 2023-04-06T13:03:18+07:00
lastmod: 2023-04-06T13:03:22+07:00
draft: false
weight: 60
images: ["thumbnail.png"]
categories: ["Bootstrap"]
tags: ["css", "bootstrap", "bootstrap 3", "modal", "fullscreen", "responsive", "override"]
contributors: ["Sugeng Sulistiyawan"]
pinned: false
homepage: false
---

Modal Full Screen Bootstrap 3

### CSS

```css
.modal-fullscreen {
  width: 100vw;
  max-width: none;
  height: 100vh;
  margin: 0;
}

.modal-fullscreen .modal-content {
  display: flex;
  flex-direction: column;
  height: inherit;
  border: 0;
  border-radius: 0;
}

.modal-fullscreen .modal-content .modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

.modal-fullscreen .modal-content .modal-header::before,
.modal-fullscreen .modal-content .modal-header::after {
  display: none;
}

.modal-fullscreen .modal-content .modal-header .close {
  order: 10;
}

.modal-fullscreen .modal-content .modal-body {
  flex: 1 1 auto;
  overflow-y: auto;
}

.modal-fullscreen .modal-content .modal-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
}

/* Just for Demo */
#btn-group-demo {
  width: 100%;
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 10px;
}
```

### HTML

```html
<div id="btn-group-demo">

  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button>
  <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">
    Launch demo modal with long content
  </button>

</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur purus orci. Duis molestie, leo
        semper auctor maximus, nunc nibh aliquet libero, id tempus turpis massa vel diam. Pellentesque mattis,
        erat vitae consectetur iaculis, diam magna facilisis augue, nec sodales augue turpis eget massa.
        Suspendisse suscipit neque at magna hendrerit, a posuere est porttitor. Vivamus augue nisl, porta nec
        vulputate vitae, venenatis ac enim. Proin in efficitur nunc. Aenean eget condimentum tortor. Suspendisse
        convallis vehicula orci lobortis facilisis. Fusce volutpat ipsum eros, ac dictum arcu blandit sed.
        Quisque at felis ut augue tincidunt porta. Aenean dapibus dolor eget egestas pellentesque. Phasellus
        suscipit dui at lorem auctor molestie. Vivamus quis dolor vitae felis auctor sollicitudin sed ut ante.
        Nulla nec ligula lectus. Aliquam ultrices, dui sed blandit hendrerit, orci quam tincidunt sem, ut
        convallis nunc nunc a mi.

        Suspendisse molestie neque rhoncus, mollis orci sit amet, gravida sapien. Ut commodo hendrerit purus, eu
        fermentum ante finibus id. Donec vulputate leo purus, at gravida metus efficitur sed. Nullam vel varius
        nisi, a euismod lacus. In quis odio vestibulum, suscipit arcu at, lobortis tellus. In hac habitasse
        platea dictumst. Praesent congue velit ex, a ornare magna euismod eget. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque felis nunc, aliquam et
        tincidunt sit amet, aliquet nec neque. Cras vitae arcu et lectus lobortis porta sit amet eget risus.
        Donec non ultricies risus, in laoreet turpis. Praesent urna lorem, ultricies eu placerat tempus,
        molestie sed velit.

        Praesent dictum condimentum sodales. Aenean porttitor, neque sed iaculis interdum, lorem turpis porta
        erat, vulputate mollis odio nulla et arcu. Nam volutpat, turpis at imperdiet maximus, purus dui
        facilisis justo, eget accumsan felis leo eu augue. Quisque eu magna nisi. Phasellus ac tellus dictum,
        molestie ipsum eget, gravida urna. Donec vulputate pulvinar sapien ac vehicula. Donec vel eros nibh.
        Maecenas sit amet ante ex. Quisque at ipsum ultrices, suscipit quam sit amet, varius ligula. Duis porta
        nulla velit, quis luctus quam mollis quis. Donec lobortis gravida lorem sed scelerisque.

        Integer sagittis nisl id odio efficitur, et blandit magna varius. Fusce sed purus sed purus vehicula
        dictum. Nullam vulputate elit id dolor suscipit mollis. Quisque interdum lectus sit amet dui bibendum
        fermentum. Curabitur dapibus erat sit amet tortor egestas, vitae finibus erat convallis. Nulla semper ex
        nec ex rhoncus, eu facilisis libero luctus. Maecenas urna sapien, laoreet nec mattis vitae, volutpat at
        lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Nullam vitae ultricies ipsum. Proin nunc tortor, pharetra fermentum velit pulvinar, blandit volutpat
        felis. Aenean sed rhoncus dui. Maecenas at quam ex. Nam id luctus augue. In non risus pretium, tincidunt
        enim eu, maximus nulla. Duis odio magna, gravida non sodales quis, dapibus sed massa. Cras vitae cursus
        leo, vel consequat purus.

        Etiam eget ante nisl. Maecenas maximus, enim in molestie ornare, quam velit sollicitudin nisi, ut
        convallis magna purus eget ex. Proin semper maximus elit eu euismod. In consequat consectetur neque, a
        eleifend augue egestas ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet
        commodo tortor. Fusce convallis tortor at odio molestie, et euismod erat consectetur. Nullam mattis
        augue et arcu venenatis, at tincidunt mi placerat. Aliquam eget augue lorem. Donec libero enim, mollis
        scelerisque imperdiet non, lacinia sed dui. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Aenean gravida, mauris elementum pharetra mollis, tellus est porttitor sem, sed imperdiet
        lorem neque ut lectus. Duis maximus feugiat nisi, sed dignissim turpis condimentum nec.

        Quisque lobortis metus vel vehicula auctor. Nunc rhoncus pharetra ultrices. Nulla tincidunt venenatis
        congue. In turpis ex, vulputate venenatis dolor eget, venenatis porta arcu. Duis magna ipsum, aliquam ut
        lectus ut, euismod bibendum tellus. Phasellus dapibus tellus in eros imperdiet bibendum. Vestibulum
        scelerisque finibus mi, non dapibus augue ullamcorper sed. Curabitur quis sagittis lorem. Quisque a
        libero nisi. Pellentesque eu diam nisl.

        Integer varius varius ligula, ut aliquam odio pulvinar eget. Fusce tellus elit, dictum in mi quis,
        sagittis efficitur ante. Nam vel sem pharetra, rutrum mi sed, ultrices odio. Pellentesque et efficitur
        eros, vitae rhoncus orci. Etiam placerat mi erat, sit amet hendrerit mauris ullamcorper id. Praesent
        facilisis viverra vulputate. Etiam faucibus condimentum lacus id gravida.

        Aliquam eu diam ac neque accumsan commodo sed nec dui. In id augue nibh. Integer semper euismod justo,
        at mattis odio fringilla et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam
        auctor massa ut rhoncus rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur
        et ex vehicula, ornare lectus nec, dictum velit. Sed nec ex ac sapien vulputate auctor. Nullam arcu
        enim, mollis at ligula non, dignissim dapibus arcu. Pellentesque non orci erat. Fusce ex nunc, volutpat
        ac dui et, tristique egestas purus. Sed diam mauris, porttitor sed accumsan id, vulputate eget ante.
        Morbi est quam, sollicitudin vitae tortor vitae, tincidunt cursus diam. Vivamus sed nulla et augue
        sodales rhoncus. Cras interdum nulla sed libero porta varius.

        Aenean faucibus nibh purus, quis faucibus diam fermentum posuere. Pellentesque commodo elit sit amet
        eros tristique, et consequat mauris iaculis. Mauris sem nulla, ultricies cursus neque non, maximus
        egestas nunc. Etiam tempor quis sem sit amet gravida. Sed fermentum rhoncus mi eu ullamcorper. Nunc
        ultrices, est dapibus sodales laoreet, odio ante pellentesque quam, sit amet dictum dui nibh eu tellus.
        Phasellus quis dui vitae tortor bibendum facilisis. Curabitur efficitur ante justo, non ultricies ligula
        tincidunt sed. Fusce sit amet pellentesque orci. Curabitur eu nulla pharetra, accumsan leo sit amet,
        luctus dolor. Donec lacinia condimentum massa.

        Quisque dictum eleifend justo, quis tincidunt ipsum vestibulum vitae. Cras non lacus blandit, pretium
        odio posuere, iaculis sapien. Fusce a euismod magna, et aliquam dui. Sed sollicitudin odio sem. Mauris
        nulla leo, rutrum vel laoreet a, lobortis ac orci. Nulla efficitur dolor at lacus cursus, in iaculis
        ligula congue. Sed tristique a augue ut venenatis. Nunc in nunc tempus, interdum sem eu, scelerisque
        sem. Donec lobortis risus lectus. Duis vitae arcu hendrerit, euismod odio eget, pellentesque metus.
        Nulla molestie purus a accumsan elementum. Sed et quam nibh. Mauris purus risus, sodales et sodales
        aliquam, posuere eget magna.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

> Just place `.modal-fullscreen` to `.modal-dialog`

#### Demo & Preview:

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-slug-hash="WNajjZg" data-user="wanforge" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wanforge/pen/WNajjZg">
  Bootstrap 3 Modal Full Screen</a> by Sugeng Sulistiyawan (<a href="https://codepen.io/wanforge">@wanforge</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

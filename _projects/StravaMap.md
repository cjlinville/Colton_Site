---
layout: project
title: 'Strava Activities'
caption: Every activity I've ever recorded on Strava.
description: >
  
date: 1 Jun 2020
image: 
  path: /assets/img/projects/Hydrology.png
  srcset: 
    1920w: /assets/img/projects/Hydrology.png
    960w:  /assets/img/projects/Hydrology.png
    480w:  /assets/img/projects/Hydrology.png
links:
  - title: Link
    url: https://qwtel.com/
accent_color: '#4fb1ba'
accent_image:
  background: '#193747'
theme_color: '#193747'
sitemap: false
---

For my personal site I've toned it down a bit. Instead of a flashy sidebar image, I chose a solid background color.
However, I've given [certain](https://qwtel.com/projects/ducky-hunting/) [pages](https://qwtel.com/projects/blocky-blocks/) big sidebar images, and let Hydejack blend back to normal when the user navigates away.


<!-- Map container -->
<div id="map" style="width:100%;height:500px;border-radius:12px;"></div>

<!-- MapLibre CSS/JS -->
<link href="https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.css" rel="stylesheet" />
<script src="https://unpkg.com/maplibre-gl@3.6.1/dist/maplibre-gl.js"></script>

<script>
(function () {
  function initMap() {
    const el = document.getElementById('map');
    if (!el) return;                 // not on this page
    if (el.dataset.inited) {         // already initialized (back/forward nav)
      if (window._mlmap) window._mlmap.resize();
      return;
    }
    el.dataset.inited = '1';

    const style = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors'
        }
      },
      layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
    };

    const map = new maplibregl.Map({
      container: 'map',
      style,
      center: [-111.8910, 40.7608],
      zoom: 9
    });
    window._mlmap = map; // for debugging / resize on PJAX

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', function () {
      // add your sources/layers here if needed
      setTimeout(() => map.resize(), 0); // ensure proper sizing after layout
    });
  }

  // Run on first full load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
  // Run again after Hydejack PJAX navigations
  document.addEventListener('pjax:load', function () {
    initMap();
    // If the map existed from a previous visit, force a resize
    if (window._mlmap) setTimeout(() => window._mlmap.resize(), 0);
  });
})();
</script>


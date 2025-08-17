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
document.addEventListener("DOMContentLoaded", function () {
  // Basic raster style using OpenStreetMap tiles (no API key needed)
  const style = {
    "version": 8,
    "sources": {
      "osm-tiles": {
        "type": "raster",
        "tiles": ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        "tileSize": 256,
        "attribution":
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    "layers": [
      { "id": "osm-tiles", "type": "raster", "source": "osm-tiles" }
    ]
  };

  const map = new maplibregl.Map({
    container: "map",
    style: style,
    center: [-111.8910, 40.7608], // SLC lon,lat
    zoom: 9
  });

  // Navigation (zoom/rotate) controls
  map.addControl(new maplibregl.NavigationControl(), "top-right");

  // Example GeoJSON overlay (replace with your data)
  map.on("load", () => {
    map.addSource("points", {
      type: "geojson",
      data: {
        "type": "FeatureCollection",
        "features": [
          { "type":"Feature",
            "properties": { "name":"Aero-Graphics HQ" },
            "geometry":{"type":"Point","coordinates":[-111.8910, 40.7608]}
          }
        ]
      }
    });
    map.addLayer({
      id: "points-layer",
      type: "circle",
      source: "points",
      paint: { "circle-radius": 6, "circle-color": "#4fb1ba" }
    });

    // Optional popup
    map.on("click", "points-layer", (e) => {
      const f = e.features[0];
      new maplibregl.Popup()
        .setLngLat(f.geometry.coordinates)
        .setHTML(`<strong>${f.properties.name}</strong>`)
        .addTo(map);
    });

    // Cursor change on hover
    map.on("mouseenter", "points-layer", () => map.getCanvas().style.cursor = "pointer");
    map.on("mouseleave", "points-layer", () => map.getCanvas().style.cursor = "");
  });
});
</script>

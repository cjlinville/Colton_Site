(function () {
  let map;

  function ensureMapLibre(cb) {
    if (window.maplibregl && typeof window.maplibregl.Map === "function") {
      cb(); 
    } else {
      setTimeout(() => ensureMapLibre(cb), 30);
    }
  }

  function initMap() {
    const el = document.getElementById("map");
    if (!el) return;

    // clean up prior instance on PJAX reloads
    if (map && map.remove) map.remove();

    const style = {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors"
        }
      },
      layers: [{ id: "osm", type: "raster", source: "osm" }]
    };

    map = new maplibregl.Map({
      container: "map",
      style,
      center: [-111.8910, 40.7608],
      zoom: 9
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("load", () => {
      // 1) Add the source
      map.addSource("activities", {
        type: "geojson",
        data: "/assets/geojson/all.geojson",
        // optional: cluster points
        // cluster: true, clusterRadius: 40
      });

    map.on("load", () => {
  // 1) Add the source
  map.addSource("activities", {
    type: "geojson",
    data: "/assets/geojson/all.geojson",
    // optional: cluster points
    // cluster: true, clusterRadius: 40
  });

  // 2a) Points (circles)
  map.addLayer({
    id: "activities-circles",
    type: "circle",
    source: "activities",
    paint: {
      "circle-radius": [
        "interpolate", ["linear"], ["zoom"],
        6, 2,
        12, 5
      ],
      "circle-color": "#ff5500",
      "circle-opacity": 0.75,
      "circle-stroke-color": "#222",
      "circle-stroke-width": 0.5
    },
    filter: ["==", ["geometry-type"], "Point"]
  });

  // 2b) Lines (e.g., ride tracks)
  map.addLayer({
    id: "activities-lines",
    type: "line",
    source: "activities",
    paint: {
      "line-color": "#00aaff",
      "line-width": [
        "interpolate", ["linear"], ["zoom"],
        6, 1.0,
        12, 3.0
      ]
    },
    filter: ["==", ["geometry-type"], "LineString"]
  });

  // 2c) Polygons (if you have them)
  map.addLayer({
    id: "activities-polys",
    type: "fill",
    source: "activities",
    paint: {
      "fill-color": "#4fb1ba",
      "fill-opacity": 0.25
    },
    filter: ["==", ["geometry-type"], "Polygon"]
  });

  // Labels (if your GeoJSON has a property like "name")
  // map.addLayer({
  //   id: "activities-labels",
  //   type: "symbol",
  //   source: "activities",
  //   layout: {
  //     "text-field": ["get", "name"],
  //     "text-size": 12,
  //     "text-offset": [0, 1]
  //   },
  //   paint: { "text-color": "#333" }
  // });

  setTimeout(() => map.resize(), 0);
});



  function boot() { ensureMapLibre(initMap); }

  // first load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  // PJAX navigations (Hydejack)
  document.addEventListener("hy-push-state-after", boot);
})();

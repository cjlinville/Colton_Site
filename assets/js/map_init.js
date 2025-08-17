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
        data: "/assets/geojson/all.geojson"
      });

      // 2) Lines (e.g., ride tracks)
      map.addLayer({
        id: "activities-lines",
        type: "line",
        source: "activities",
        filter: ["==", ["geometry-type"], "LineString"],
        paint: {
          "line-color": "#00aaff",
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, 1.0, 12, 3.0],
          "line-opacity": 0.9
        },
        layout: {
          "line-cap": "round",
          "line-join": "round"
        }
      });

      setTimeout(() => map.resize(), 0);
    });

    // optional: surface load errors in the console
    map.on("error", (e) => console.error("MapLibre error:", e && e.error));
  } // <-- this brace was missing

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

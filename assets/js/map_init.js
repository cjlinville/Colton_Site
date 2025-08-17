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
    map.on("load", () => setTimeout(() => map.resize(), 0));
    window._mlmap = map;
  }

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

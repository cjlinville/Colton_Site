(function () {
  let map;

  function initMap() {
    const el = document.getElementById('map');
    if (!el) return;

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
      style: style,
      center: [-111.8910, 40.7608],
      zoom: 9
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("load", () => setTimeout(() => map.resize(), 0));
  }

  // initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMap);
  } else {
    initMap();
  }

  // Hydejack PJAX navigation
  document.addEventListener("hy-push-state-after", initMap);
})();

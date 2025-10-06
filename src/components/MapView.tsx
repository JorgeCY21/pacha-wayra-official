import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

interface MapViewProps {
  region: string;
  date: Date;
}

const MapView: React.FC<MapViewProps> = ({ region, date }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const baseLayer = new TileLayer({ source: new OSM() });

    const resultSource = new VectorSource();
    const resultLayer = new VectorLayer({
      source: resultSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: "#1976d2" }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, resultLayer],
      view: new View({
        center: fromLonLat([-75.0152, -9.19]), // Perú
        zoom: 6,
      }),
    });

    const buscar = async () => {
      const input = document.getElementById("search") as HTMLInputElement | null;
      if (!input) return;
      const q = input.value.trim();
      if (!q) return;

      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=es&countrycodes=pe&q=${encodeURIComponent(
        q
      )}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!data || data.length === 0) {
          alert("No se encontraron resultados en Perú.");
          return;
        }

        resultSource.clear();
        const lon = parseFloat(data[0].lon);
        const lat = parseFloat(data[0].lat);

        alert(`📍 Resultado encontrado:\nLat: ${lat.toFixed(6)}\nLon: ${lon.toFixed(6)}`);

        const feat = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          name: data[0].display_name,
        });
        resultSource.addFeature(feat);
        map.getView().animate({ center: fromLonLat([lon, lat]), zoom: 12 });
      } catch (err) {
        console.error("Error al buscar:", err);
      }
    };

    const btn = document.getElementById("btnSearch");
    const input = document.getElementById("search") as HTMLInputElement | null;
    btn?.addEventListener("click", buscar);
    input?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") buscar();
    });

    map.on("singleclick", (evt) => {
      const coord = toLonLat(evt.coordinate);
      alert(`📍 Coordenadas seleccionadas:\nLat: ${coord[1].toFixed(6)}\nLon: ${coord[0].toFixed(6)}`);
      resultSource.clear();
      const feat = new Feature({
        geometry: new Point(evt.coordinate),
      });
      resultSource.addFeature(feat);
    });

    return () => {
      btn?.removeEventListener("click", buscar);
      map.setTarget(undefined);
    };
  }, [region, date]);

  return (
    <div className="flex flex-col h-[380px] w-full rounded-2xl overflow-hidden shadow">
      <div className="flex gap-2 p-2 bg-gray-100 border-b border-gray-300">
        <input
          id="search"
          type="text"
          placeholder="Buscar lugar o ciudad..."
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="btnSearch"
          className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-800 transition-colors"
        >
          Buscar
        </button>
      </div>
      <div ref={mapRef} className="flex-1 w-full h-full" />
    </div>
  );
};

export default MapView;

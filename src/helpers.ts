import axios, { AxiosPromise } from "axios";


export const MAPS_KEY = "AIzaSyDGnDHV2DTXQDoIYqLuDBLtstLu250bXYo";
export const AMSTERDAM_BOUNDS = [
  "52.315195",
  "4.786606",
  "52.425873",
  "5.057144",
];
export const AMSTERDAM_CENTER_LAT_LNG = { lat: 52.377956, lng: 4.89707 };
export const TOKEN = "edd5ed0e29943baa4f713c19d773e17f7b9d2ad6";

export const MAP_CONTAINER_STYLE = {
    width: '100%',
    height: '100vh'
  };

export async function getStations(boundaries: string[]): Promise<any> {
  const bounds = boundaries.join(",");
  const locations: Array<Record<string, number>> = [];
  try {
    const response = await axios({
      url:
        "https://api.waqi.info/map/bounds/?latlng=" +
        bounds +
        "&token=" +
        TOKEN,
      method: "GET",
    });
    const stations = response.data.data;
    stations.forEach((station: any) => {
      locations.push({
        lat: station.lat,
        lng: station.lon,
      });
    });
    return { stations, locations };
  } catch (e) {
    console.log("error fetching station locations");
  }
}

export async function getStationFeeds(stations: any): Promise<any> {
  const stationFeedPromises: Array<AxiosPromise> = [];
  try {
    stations.forEach((station: any) => {
      stationFeedPromises.push(
        axios({
          url:
            "https://api.waqi.info/feed/@" + station.uid + "/?token=" + TOKEN,
          method: "GET",
        })
      );
    });
    const result = await Promise.all(stationFeedPromises);
    return result.map((res: any) => res.data.data);
  } catch (e) {
    console.log("error fetching station feeds", e);
    return [];
  }
}

export function iconGenerator(pm25: number): any {
  let color = "red";
  switch (true) {
    case pm25 < 15: // Excellent
      color = "white";
      break;
    case pm25 < 30: // Good
      color = "green";
      break;
    case pm25 < 55: // Moderate
      color = "orange ";
      break;
    case pm25 < 110: // Unhealthy
      color = "yellow";
      break;
    default: // Extremelty Unhealthy
  }

  return {
    path: "M0 0 a 8 8 0 3 1 1 0",
    fillColor: color,
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  };
}

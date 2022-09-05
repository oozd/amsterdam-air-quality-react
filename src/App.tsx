import { useEffect, useState } from "react"
import { Map } from "./components/Map"
import { getStations, getStationFeeds, AMSTERDAM_BOUNDS } from "./helpers";
import AppBar from '@mui/material/AppBar';
import ToolbarWrapper from "./components/Toolbar";

const App = () => {
  const [stationLocations, setStationLocations] = useState<Array<Record<string, number>>>([])
  const [stations, setStations] = useState<[]>([]);
  const [stationFeeds, setStationFeeds] = useState<Array<Record<string, any>>>([]);
  const [intervalId, setIntervalId] = useState<any>();


  useEffect(() => {
    const callGetStations = async () => {
      const response = await getStations(AMSTERDAM_BOUNDS);
      setStationLocations(response.locations);
      setStations(response.stations);
    }
    callGetStations();
  }, []);

  useEffect(() => {
    const callGetStationFeeds = async () => {
      setStationFeeds(await getStationFeeds(stations))
    }
    callGetStationFeeds();
  }, [stations])

    async function refreshData(switchState: boolean) {
      if (switchState === false) {
        clearInterval(intervalId);
        return;
      }
      setIntervalId(setInterval(async () => {
        setStationFeeds(await getStationFeeds(stations));
      }, 10000));
    }

  return (
    <>
    <AppBar>
      <ToolbarWrapper onSwitchChange={refreshData}/>
    </AppBar>
      <Map stations={stationFeeds} stationLocations={stationLocations}></Map>
    </>
  )
}
export default App
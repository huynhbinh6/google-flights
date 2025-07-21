import { useAirportStore } from "middleware/airportStore";
import { axiosClient } from "./axiosClient";
import { BASE_URL } from "./config";

export const getNearByAirports = async (lat: number, lng: number) => {
  const setNearAirports = useAirportStore.getState().setNearAirports;
  const setLoading = useAirportStore.getState().setLoading;

  setLoading(true);
  try {
    const res = await axiosClient.get(
      `${BASE_URL}/api/v1/flights/getNearByAirports?lat=${lat}&lng=${lng}`
    );
    const newData = res.data;

    const currentData = useAirportStore.getState().nearAirports;
    const isDifferent = JSON.stringify(currentData) !== JSON.stringify(newData);
    if (isDifferent) {
      setNearAirports(newData);
    }
  } catch (err) {
    console.error("Error fetching nearby airports", err);
  } finally {
    setLoading(false);
  }
};
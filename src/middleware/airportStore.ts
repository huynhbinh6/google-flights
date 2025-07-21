import { LocationData, Place } from "@screens/search/types";
import { create } from "zustand";

interface LocationStore {
  nearAirports: LocationData | null;
  isLoading: boolean;
  setNearAirports: (data: LocationData) => void;
  setLoading: (loading: boolean) => void;
}

export const useAirportStore = create<LocationStore>((set) => ({
  nearAirports: null,
  isLoading: false,
  setNearAirports: (data) => set({ nearAirports: data }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

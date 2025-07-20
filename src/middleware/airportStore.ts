import { LocationData } from "@screens/search/types";
import { create } from "zustand";

interface LocationStore {
  airports: LocationData | null;
  isLoading: boolean;
  setAirports: (data: LocationData) => void;
  setLoading: (loading: boolean) => void;
}

export const useAirportStore = create<LocationStore>((set) => ({
  airports: null,
  isLoading: false,
  setAirports: (data) => set({ airports: data }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

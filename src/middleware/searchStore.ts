import { searchAirport } from "@helpers/mockData";
import { Place } from "@screens/search/types";
import { axiosClient } from "@services/api/axiosClient";
import { BASE_URL } from "@services/api/config";
import { create } from "zustand";

type SearchState = {
  query: string;
  results: Place[];
  isLoading: boolean;
  setQuery: (query: string) => void;
  search: () => Promise<void>;
};

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  results: [],
  isLoading: false,
  setQuery: (query) => set({ query }),

  search: async () => {
    const query = get().query;
    if (!query) return;

    set({ isLoading: true });

    try {
      const res = await axiosClient.get(
        `${BASE_URL}/api/v1/flights/getNearByAirports?query=${query}&locale=en-US`
      );
      const newData = res.data;
      set({ results: newData || [], isLoading: false });
    } catch (error) {
      console.error("Search error:", error);
      set({results: searchAirport.data})
    } finally {
      set({ isLoading: false });
    }
  },
}));

import { Patient } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	searchResults: Patient[];
	setSearchResults: (res: Patient[]) => void;
}

export const useSearchStore = create<State>()(
	persist(
		(set, get) => ({
			searchResults: [],
			setSearchResults: (res) => {
				const { searchResults } = get();
				set({ searchResults: res });
			},
		}),
		{ name: "search-results" }
	)
);

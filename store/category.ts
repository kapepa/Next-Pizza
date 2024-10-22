import { create } from 'zustand'

interface CategoryStoreState {
  activeId: string,
  setActiveId: (activeId: string) => void,
}

export const useCategoryStore = create<CategoryStoreState>((set) => ({
  activeId: "",
  setActiveId: (activeId: string) => set({ activeId }),
}))
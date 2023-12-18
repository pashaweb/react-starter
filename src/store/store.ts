import { create } from 'zustand';
import { type StateCreator } from 'zustand';
import { TVulnerability } from '../types';

type Store = {
  vulnerabilities: TVulnerability[];
  addVulnerability: (vulnerability: TVulnerability) => void;
  addList: (vulnerabilities: TVulnerability[]) => void;
  getVulnerabilityById: () => TVulnerability;
  loadMore: (page: number) => void;
  currentPage: number;
  loadAll: () => void;
};

const getData = async (page: number): Promise<TVulnerability[]> => {
  const response = await fetch(
    `http://98.71.235.115:3000/api/ip-to-vulnerabilities?page=${page}&size=10`
  );
  const data = await response.json();
  return data;
};

const volStoreCreator: StateCreator<Store> = (set) => ({
  currentPage: 0,
  vulnerabilities: [],
  addVulnerability: (vulnerability) =>
    set((state) => ({
      vulnerabilities: [...state.vulnerabilities, vulnerability],
    })),
  addList: (vulnerabilities) =>
    set((state) => ({
      vulnerabilities: [...state.vulnerabilities, ...vulnerabilities],
    })),
  getVulnerabilityById: () => {
    return { ip: '', vulnerabilities: [] };
  },
  loadMore: async (page: number) => {
    const data = await getData(page);
    set((state) => ({
      vulnerabilities: [...state.vulnerabilities, ...data],
    }));
  },
  loadAll: async () => {
    const allData: TVulnerability[] = [];
    let page = 0;
    let limit = true;
    while (limit) {
      // eslint-disable-next-line no-await-in-loop

      console.log(page);
      const data = await getData(page);
      if (data.length === 0) {
        limit = false;
        break;
      }
      allData.push(...data);
      page += 1;
    }
    // const data = await getData(0);
    set((state) => ({
      vulnerabilities: [...state.vulnerabilities, ...allData],
    }));
  },
});

// eslint-disable-next-line import/prefer-default-export
export const useVolStore = create(volStoreCreator);

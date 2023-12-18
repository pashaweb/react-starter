import { useEffect, useReducer } from 'react';
import { TVulnerability } from '../types';

type TAction = {
  type: 'ADD_LIST';
  payload: TVulnerability[];
};

type TReducer = (state: TVulnerability[], action: TAction) => TVulnerability[];
const reducer: TReducer = (state, action: TAction) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const getData = async (page: number): Promise<TVulnerability[]> => {
  const response = await fetch(
    `http://98.71.235.115:3000/api/ip-to-vulnerabilities?page=${page}&size=10`
  );
  const data = await response.json();
  return data;
};

export default function useStoreHook() {

    // const getSpecificData = async (ip: string): Promise<TVulnerability[]> => {
    //
    // }
  const [vulnerabilities, dispatch] = useReducer(reducer, []);
  const getAllData = async () => {
    const data = await getData(0);
    dispatch({ type: 'ADD_LIST', payload: data });
  };
  useEffect(() => {
    getData(0).then((data) => {
      dispatch({ type: 'ADD_LIST', payload: data });
    });
  }, []);
  return { vulnerabilities, getAllData };
}

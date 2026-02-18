import api from "./api";
import type { ICar, ICarRegister } from "../types/car";

const carService = {
  listCars: async(): Promise<ICar[]> => {
    const response = await api.get<ICar[]>(`/listarCarros`);
    return response.data;
  },

  carRegister: async (data: ICarRegister): Promise<ICar> => {
    const response = await api.post<ICar>('/cadastrarCarro', data);
    return response.data;
  },

  updateCar: async (carId: number, data: ICarRegister): Promise<ICar> => {
    const response = await api.put<ICar>(`/atualizarCarros/${carId}`, data);
    return response.data;
  },

  deleteCar: async (carId: number): Promise<void> => {
    await api.delete<void>(`deletarCarro/${carId}`);
  },
};

export default carService;

import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ICar, ICarRegister } from "../../types/car";
import carService from "../../service/carsService";
import { CARS_QUERY_KEY } from "./useQueryGetCars";

interface IUpdatePayload {
  carId: number;
  data: ICarRegister;
}

export const useMutateUpdateCar = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ICar, Error, IUpdatePayload>({
    mutationFn: ({ carId, data }) => carService.updateCar(carId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARS_QUERY_KEY] });
    },
    onError: (err) => {
      console.error("Erro ao atualizar carro; ", err.message);
    },
  });

  return {
    updateCar: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

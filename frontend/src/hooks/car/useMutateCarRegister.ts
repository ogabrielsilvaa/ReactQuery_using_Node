import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ICar, ICarRegister } from "../../types/car";
import carService from "../../service/carsService";
import { CARS_QUERY_KEY } from "./useQueryGetCars";

export const useMutateCarRegister = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ICar, Error, ICarRegister>({
    mutationFn: (payload) => carService.carRegister(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARS_QUERY_KEY] });
    },
    onError: (err) => {
      console.error("Erro ao cadastrar carro: ", err.message);
    },
  });

  return {
    carRegister: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

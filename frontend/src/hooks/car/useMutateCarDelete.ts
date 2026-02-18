import { useMutation, useQueryClient } from "@tanstack/react-query"
import carService from "../../service/carsService";
import { CARS_QUERY_KEY } from "./useQueryGetCars";

export const useMutateCarDelete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, number>({
    mutationFn: ( carId: number ) => carService.deleteCar(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CARS_QUERY_KEY] });
    },
    onError: (err) => {
      console.error("Erro ao deletar carro; ", err.message);
    },
  });

  return {
    deleteCar: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

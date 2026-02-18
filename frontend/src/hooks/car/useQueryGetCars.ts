import { useQuery } from "@tanstack/react-query";
import type { ICar } from "../../types/car";
import carService from "../../service/carsService";

export const CARS_QUERY_KEY = 'cars-list';

export const useQueryGetCars = () => {
  const query = useQuery<ICar[], Error, ICar[], [string]>({
    queryKey: [CARS_QUERY_KEY],
    queryFn: carService.listCars,
    staleTime: 1000 * 60 * 5,
  });

  return {
    cars: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

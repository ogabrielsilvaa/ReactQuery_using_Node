import { Spinner } from "react-bootstrap";
import { useQueryGetCars } from "../hooks/car/useQueryGetCars"
import { CarCard } from "./carCard";
import type { ICar } from "../types/car";

export function CarList({ onEdit }: { onEdit: (car: ICar) => void }) {
  const { cars, isLoading } = useQueryGetCars();

  console.log(cars);
  return (
    <>
    <div className="flex flex-col">
      <h3 className="whitespace-nowrap text-xl font-bold mt-3">
        Lista de Carros vindos do backend
      </h3>
      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      ) : cars && cars.length > 0 ? (
        <div className="grid gap-2">
          {cars.map((car) => (
            <div key={car.id}>
              <CarCard
                car={car}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
        ) : (
          <p>Nenhum carro encontrado.</p>
        )}
    </div>
    </>
  );
}

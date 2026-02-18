import { useMutateCarDelete } from "../hooks/car/useMutateCarDelete";
import type { ICar } from "../types/car";

interface ICarCardProps {
  car: ICar;
  onEdit: (car: ICar) => void;
}

export function CarCard({ car, onEdit }: ICarCardProps) {
  const { deleteCar, isPending } = useMutateCarDelete();

  const handleDelete = () => {
    if (window.confirm("Deseja realmente excluir este veículo?")) {
      deleteCar(car.id);
    }
  };

  return (
    <div className="w-full h-full flex mb-2 justify-between items-center justify-between px-4 border-2 border-black rounded-lg">
      <div className="flex flex-col">
        <div>
          Modelo: {car.model}
        </div>
        <div>
          Ano: {car.year}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="p-2 border border-blue-500 bg-blue-500 rounded-md hover:bg-blue-600">
          <button
            onClick={() => onEdit(car)}
            className="text-white"
          >
            Editar
          </button>
        </div>

        <div className="w-20 h-10 bg-red-500 justify-center flex items-center rounded-md hover:bg-red-600">
          <button onClick={handleDelete} disabled={isPending} className="text-white">
            {isPending ? '...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}

import { CarList } from './pages/carList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { RegisterCarForm } from './components/registerCarForm';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import type { ICar } from './types/car';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState<ICar | null>(null);

  const handleEdit = (car: ICar) => {
    setCarToEdit(car);
    setShowModal(true);
  }
  const handleOpen = () => setShowModal(true)
  const handleClose = () => {
    setShowModal(false);
    setCarToEdit(null);
  }


  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
        <div className="flex justify-between items-center mb-8">
          <h1 className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">Concessionária</h1>

          <Button variant="primary" onClick={handleOpen} className="shadow-lg whitespace-nowrap">
            + Adicionar Carro
          </Button>
        </div>

        <CarList
          onEdit={handleEdit}
        />
        <RegisterCarForm
          show={showModal}
          handleClose={handleClose}
          initialCar={carToEdit}
        />
      </div>
    </>
  )
}

export default App

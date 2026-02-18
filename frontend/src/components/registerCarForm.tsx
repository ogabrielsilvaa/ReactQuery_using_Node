import React, { useEffect, useState } from "react";
import { useMutateCarRegister } from "../hooks/car/useMutateCarRegister";
import { Button, Modal } from "react-bootstrap";
import type { ICar } from "../types/car";
import { useMutateUpdateCar } from "../hooks/car/useMutateUpdateCar";

interface IFormRegisterProps {
  show: boolean;
  handleClose: () => void;
  initialCar: ICar | null;
}

export function RegisterCarForm({ show, handleClose, initialCar }: IFormRegisterProps) {
  const [model, setModel] = useState("");
  const [year, setYear] = useState('');
  const { carRegister, isPending } = useMutateCarRegister();
  const { updateCar } = useMutateUpdateCar();

  useEffect(() => {
    if (initialCar) {
      setModel(initialCar.model);
      setYear(String(initialCar.year));
    } else {
      setModel("");
      setYear("");
    }
  }, [initialCar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!model || !year) return alert("Preencha todos os campos!");

    if (initialCar) {
      updateCar(
        { 
          carId: initialCar.id,
          data: { model, year: Number(year) }
         },
        { onSuccess: () => handleClose() }
      );
    } else {
    carRegister(
      { model, year: Number(year) },
      {
        onSuccess: () => {
          setModel("");
          setYear("");
          handleClose();
        }
      }
    )};
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Veículo</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={handleSubmit}>
        <Modal.Body className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-bold mb-1">Modelo</label>
            <input 
              className="border p-2 rounded"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Ex: Honda Civic"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold mb-1">Ano</label>
            <input 
              type="number"
              className="border p-2 rounded"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ex: 2022"
              required
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar Carro"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

import { IPizzaForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAddPizzaLoading } from '../../store/slices/pizzaSlice.ts';
import { addNewPizza, fetchPizza } from '../../store/thunks/pizzaThunks.ts';
import React, { useState } from 'react';
import Spinner from '../UI/Spinner/Spinner.tsx';

const PizzaForm = () => {
  
  const initialStateToForm: IPizzaForm = {
    title: "",
    price: 0,
    image: "",
  };

  const addLoading = useAppSelector(selectAddPizzaLoading);
  const dispatch = useAppDispatch();

  const [pizza, setPizza] = useState<IPizzaForm>(initialStateToForm);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    if (pizza.title && pizza.price && pizza.price > 0) {
      await dispatch(addNewPizza({...pizza}))
    } else {
      alert('Fill in all fields!');
    }
    setPizza(initialStateToForm);
    dispatch(fetchPizza())
  };


  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPizza((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  return (
    <div className="container">
      <h2 className="text-center">Add new meal</h2>
      <div className="d-flex justify-content-center my-3">
        {addLoading ? <Spinner/> : null}
      </div>
      <form className="w-50 mx-auto" onSubmit={onSubmit}>

        <div className="mb-4">
          <label htmlFor="title" className="form-label">Meal title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title of meal"
            name="title"
            value={pizza.title}
            onChange={onChangeInput}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter price of meal"
            name="price"
            value={pizza.price}
            onChange={onChangeInput}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label">Image url</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter image Url"
            name="image"
            value={pizza.image}
            onChange={onChangeInput}
            required
          />
        </div>

        <button
          type={"submit"}
          className={"btn btn-outline-primary"}
          disabled={addLoading}
        >Create</button>

      </form>
    </div>
  );
};

export default PizzaForm;
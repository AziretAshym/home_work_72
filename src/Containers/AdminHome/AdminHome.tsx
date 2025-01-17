import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllPizza, selectFetchPizzaLoading } from '../../store/slices/pizzaSlice.ts';
import { useEffect } from 'react';
import { deletePizza, fetchPizza } from '../../store/thunks/pizzaThunks.ts';
import Spinner from '../../Components/UI/Spinner/Spinner.tsx';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {

  const fetchLoading = useAppSelector(selectFetchPizzaLoading);
  const allPizza = useAppSelector(selectAllPizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPizza());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deletePizza(id));
    dispatch(fetchPizza());
  };

  const handleAddPizza = () => {
    navigate('/add-pizza');
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-pizza/${id}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <button type="button" onClick={handleAddPizza} className="btn btn-outline-primary">Add new Pizza</button>
      </div>
      <h1 className="text-center mb-5">All types of pizza</h1>
      {fetchLoading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner/>
        </div>
      ) : (
        <>
          {allPizza.length === 0 ? (
            <h2 className="text-center">No pizza </h2>
          ) : (
            <>
              {allPizza.map((pizza) => (
                <div
                  className="card w-50 mx-auto mb-3"
                  key={pizza.id}
                >
                  <div className="card-body d-flex  align-items-center gap-3">
                    <img
                      className="me-5"
                      src={pizza.image}
                      alt={pizza.title}
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "100%",
                      }}
                    />
                    <h5 className="fs-3 card-title mb-0 me-5">{pizza.title}</h5>
                    <p className="mb-0 me-5 fs-5">Price: <strong>{pizza.price}</strong></p>
                    <div className="ms-auto">
                      <button type={"button"} className="btn btn-outline-primary" onClick={() =>handleEdit(pizza.id)}>Edit</button>
                      <button type={"button"} className="btn btn-outline-danger ms-3" onClick={() =>handleDelete(pizza.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminHome;
import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { selectAllPizza } from '../../store/slices/pizzaSlice';
import { addToCart } from '../../store/slices/ordersSlice.ts';
import { fetchPizza } from '../../store/thunks/pizzaThunks';
import { IPizza } from '../../types';
import Spinner from '../../Components/UI/Spinner/Spinner';

const ClientHome = () => {

  const dispatch = useDispatch();
  const pizzas = useAppSelector(selectAllPizza);


  const totalPrice = useAppSelector((state) => state.orders.totalPrice);

  useEffect(() => {
    dispatch(fetchPizza());
  }, [dispatch]);



  const handleAddToCart = (pizza: IPizza) => {
    dispatch(addToCart(pizza));
  };



  return (
    <>
      <div className="container">
        <h1 className="text-center my-4">Menu</h1>
        {pizzas.length === 0 ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : (

          <div className="list-group">
            {pizzas.map((pizza) => (
              <div className="card w-50 mx-auto mb-3" key={pizza.id}>
                <div className="card-body d-flex align-items-center gap-3">

                  <img
                    className="me-5"
                    src={pizza.image}
                    alt={pizza.title}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '100%',
                    }}
                  />
                  <h5 className="fs-3 card-title mb-0 me-5">{pizza.title}</h5>
                  <p className="mb-0 me-5 fs-5">
                    Price: <strong>{pizza.price}</strong>
                  </p>

                  <div className="ms-auto">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleAddToCart(pizza)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div
        className="bg-primary-subtle w-25 d-flex justify-content-between align-items-center py-5 px-3"
        style={{
          position: 'fixed',
          top: '145px',
          right: '10px',
          zIndex: 1000,
          borderRadius: '8px',
        }}
      >
          <p className="m-0 fs-4">Total price: <strong>{totalPrice}</strong></p>
          <button type="button" className="btn btn-outline-primary">
            Checkout
          </button>
      </div>
    </>
  );
};

export default ClientHome;

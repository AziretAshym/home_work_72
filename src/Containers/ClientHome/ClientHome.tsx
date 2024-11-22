import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllPizza } from '../../store/slices/pizzaSlice';
import { addToCart, clearCart } from '../../store/slices/ordersSlice';
import { fetchPizza } from '../../store/thunks/pizzaThunks';
import { IPizza } from '../../types';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Modal from '../../Components/Modal/Modal';
import { sendOrder } from '../../store/thunks/pizzaThunks'

const ClientHome = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectAllPizza);
  const totalPrice = useAppSelector((state) => state.orders.totalPrice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPizza());
  }, [dispatch]);

  const handleAddToCart = (pizza: IPizza) => {
    dispatch(addToCart(pizza));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOrder = () => {
    const order = {
      items: pizzas,
      totalPrice: totalPrice,
    };
    dispatch(sendOrder(order));
    dispatch(clearCart());
    setIsModalOpen(false);
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
                    src={pizza.image}
                    alt={pizza.title}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '100%',
                    }}
                  />
                  <h5 className="fs-3 card-title mb-0">{pizza.title}</h5>
                  <p className="mb-0 fs-5">
                    Price: <strong>{pizza.price}</strong>
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-auto"
                    onClick={() => handleAddToCart(pizza)}
                  >
                    Add to cart
                  </button>
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
          zIndex: 111,
          borderRadius: '8px',
        }}
      >
        <p className="m-0 fs-4">
          Total price: <strong>{totalPrice}</strong>
        </p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleOpenModal}
        >
          Checkout
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOrder={handleOrder}
      />
    </>
  );
};

export default ClientHome;

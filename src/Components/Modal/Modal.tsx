import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart, clearCart } from '../../store/slices/ordersSlice';
import { sendOrder } from '../../store/thunks/pizzaThunks';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const cartItems = useAppSelector((state) => state.orders.items);
    const totalPrice = useAppSelector((state) => state.orders.totalPrice);
    const dispatch = useAppDispatch();

    const handleRemoveFromCart = (pizzaId: string) => {
        dispatch(removeFromCart(pizzaId));
    };

    const handleOrder = () => {
        const order = cartItems.reduce((acc: any, item) => {
            acc[item.id] = item.amount;
            return acc;
        }, {});

        dispatch(sendOrder(order))
            .then(() => {
                dispatch(clearCart());
                onClose();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal show"
            style={{
                display: 'block',
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: '999',
            }}
        >
            <div
                className="modal-dialog"
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <h5 className="text-center mb-4">Order Preview</h5>
                <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                    <strong>Name</strong>
                    <strong>Amount</strong>
                    <strong>Action</strong>
                </div>
                <div>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty!</p>
                    ) : (
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span className="fw-bold">{item.title}</span>
                                    <span className="ms-3">x{item.amount}</span>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <p className="fs-5">
                        Total Price: <strong>{totalPrice}</strong>
                    </p>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleOrder}
                        >
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

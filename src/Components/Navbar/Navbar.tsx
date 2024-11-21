import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-primary-subtle mb-5">
        <div className="container">
          <a className="navbar-brand fs-2">Turtle Pizza</a>
          <div>
            <NavLink to="/admin" className="btn btn-outline-primary">Pizzas</NavLink>
            <button type="button" className="btn btn-outline-primary ms-4">Orders</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
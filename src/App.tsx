import PizzaForm from './Components/PizzaForm/PizzaForm.tsx';
import AdminHome from './/Containers/AdminHome/AdminHome.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return <>
    <header>
      <Navbar />
    </header>
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/add-pizza" element={<PizzaForm />} />
      <Route path="/edit-pizza/:pizzaId" element={<PizzaForm />} />
    </Routes>
  </>;
};

export default App;

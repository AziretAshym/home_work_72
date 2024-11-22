import PizzaForm from './Components/PizzaForm/PizzaForm.tsx';
// import AdminHome from './/Containers/AdminHome/AdminHome.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';
import { Route, Routes } from 'react-router-dom';
import ClientHome from './Containers/ClientHome/ClientHome.tsx';
import AdminHome from './Containers/AdminHome/AdminHome.tsx';

const App = () => {
  return <>
    <header>
      <Navbar />
    </header>
    <Routes>
      <Route path="/" element={<ClientHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/add-pizza" element={<PizzaForm />} />
      <Route path="/edit-pizza/:pizzaId" element={<PizzaForm />} />
      <Route path="/*" element={<h1 className="text-center">Not found</h1>}/>

    </Routes>
  </>;
};

export default App;

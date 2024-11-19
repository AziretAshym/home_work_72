export interface IPizza {
  id?: string;
  title: string;
  price: number;
  image: string;
}
export interface IPizzaForm {
  title: string;
  price: number;
  image: string;
}

export interface IPizzaApi {
  [id: string]: IPizza;
}
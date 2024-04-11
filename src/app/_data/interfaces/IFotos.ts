export interface IFotos {
  tiempoTransicion: number;
  fotos: IFoto[];
}

export interface IFoto {
  url: string;
  texto: string;
}
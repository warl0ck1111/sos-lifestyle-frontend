export class Color{
  id: number = 0;
  name?:string;
  description?:string;
}


export interface ColorRequest{
  name:string;
  description:string;
}

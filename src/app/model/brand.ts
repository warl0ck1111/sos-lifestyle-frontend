export class Brand{
  id: number = 0;
  name?:string;
  description?:string;
}


export interface BrandRequest{
  name:string;
  description:string;
}

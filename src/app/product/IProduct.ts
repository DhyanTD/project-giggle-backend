import { CurrencyCode } from "../orders/IOrders";
import { UserType } from "../users/IUser";

export interface IProduct {
  id:string;
  name:string;
  desc?:string;
  createdBy:string;
  createdByType: UserType;
  isPublished:boolean;
  githubUrl?:string;
  youtubeUrl?:string;
  instructions?: string;
  fileUrl?:string;
  demoUrl?:string;
  imageUrl?:string;
  price?:PriceObj[];
  categoryTagId?:string;
} 
export interface PriceObj {
	currency: CurrencyCode
	price: number
}
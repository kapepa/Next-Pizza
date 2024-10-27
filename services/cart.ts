import { CartDto, CreateCartItemValues } from "./dto/cart.dto";
import { instance } from "./instance";


export const getCart = async (): Promise<CartDto> => {
  return (await instance.get<CartDto>('/cart')).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDto> => {
  return (await instance.patch<CartDto>('/cart/' + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDto> => {
  return (await instance.delete<CartDto>('/cart/' + id)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDto> => {
  return (await instance.post<CartDto>('/cart', values)).data;
};
import { CartDto, CreateCartItemValues } from "./dto/cart.dto";
import { instance } from "./instance";


export const getCart = async (): Promise<CartDto> => {
  return (await instance.get<CartDto>('/cart')).data;
};

export const updateItemQuantity = async ({ id, quantity }: { id: string, quantity: number }): Promise<CartDto> => {
  return (await instance.patch<CartDto>('/cart/' + id, { quantity })).data;
};

export const addCartItem = async (props: CreateCartItemValues): Promise<CartDto> => {
  return (await instance.post<CartDto>('/cart', props)).data;
};

export const removeCartItem = async (id: string): Promise<CartDto> => {
  return (await instance.delete<CartDto>('/cart/' + id)).data;
};


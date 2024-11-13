export type CountButtonType = "plus" | "minus";

export interface ClickCountButtonProps {
  id: string,
  quantity: number,
  type: CountButtonType,
}

export interface SubmitPizzaProps {
  ingredients: string[],
  productItemId: string,
}
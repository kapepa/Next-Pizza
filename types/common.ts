export type CountButtonType = "plus" | "minus";

export interface ClickCountButtonProps {
  id: string,
  quantity: number,
  type: CountButtonType,
}
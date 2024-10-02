import { FC, ReactNode } from "react";
import { Checkbox } from "../ui/checkbox";

export interface FilterCheckboxProps {
  text: string,
  value: string,
  checked?: boolean,
  endAdornment?: ReactNode,
  onCheckedChange?: (checked: boolean) => void,
}

const FilterCheckbox: FC<FilterCheckboxProps> = (props) => {
  const { text, value, checked, endAdornment, onCheckedChange } = props;

  return (
    <div
      className="flex items-center space-x-2"
    >
      <Checkbox
        id={`checkbox-${String(value)}`}
        value={value}
        checked={checked}
        className="rounded-[8px] w-6 h-6"
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor={`checkbox-${String(value)}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  )
}

export { FilterCheckbox }
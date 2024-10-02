"use client"

import { ChangeEvent, FC, useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Item } from "@radix-ui/react-select";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string,
  items: Item[],
  limit?: number,
  onChange?: (value: string[]) => void,
  className?: string,
  defaultItems: Item[],
  defaultValue?: string[],
  searchInputPlaceholder?: string,
}

const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = (props) => {
  const { title, items, limit = 5, onChange, className, defaultItems, defaultValue, searchInputPlaceholder = "Search..." } = props;
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const list = showAll 
    ? items.filter(item => item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    : defaultItems?.slice(0, limit);

  return (
    <div
      className={className}
    >
      <p
        className="mb-5"
      >
        {title}
      </p>

      {
        showAll && (
          <div
            className="mb-5"
          >
            <Input
              onChange={onChangeSearchInput }
              className="bg-gray-50 border-none"
              placeholder={searchInputPlaceholder}
            />
          </div>
        )
      }

      <div
        className="flex flex-col gap-4 max-h-96 overflow-auto scrollbar"
      >
        {
          list.map((item, index) => (
            <FilterCheckbox
              key={`${item.text}-${index}`}
              text={item.text}
              value={item.value}
              checked={item.checked}
              endAdornment={item.endAdornment}
              onCheckedChange={(ids) => console.log(ids)}
            />
          ))
        }
      </div>

      {
        items.length > limit && (
          <div
            className={showAll ? "border-t border-t-neutral-100 mt-4": ""}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-primary mt-3"
            >
              {showAll ? "Hide" : "Show all"}
            </button>
          </div>
        )
      }
    </div>
  )
}

export { CheckboxFiltersGroup }
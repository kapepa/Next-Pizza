"use client"

import { ChangeEvent, FC, useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Item } from "@radix-ui/react-select";
import { Skeleton } from "../ui/skeleton";

type Item = Pick<FilterCheckboxProps, "text" | "value" | "endAdornment">;

interface CheckboxFiltersGroupProps {
  name: string,
  title: string,
  items: Item[],
  limit?: number,
  loading: boolean,
  selected?: Set<string>,
  className?: string,
  defaultItems?: Item[],
  defaultValue?: string[],
  onClickCheckbox?: (id: string) => void,
  searchInputPlaceholder?: string,
}

const CheckboxFiltersGroup: FC<CheckboxFiltersGroupProps> = (props) => {
  const { name, title, items, limit = 5, loading, className, selected, defaultItems, defaultValue, onClickCheckbox, searchInputPlaceholder = "Search..." } = props;
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  if (loading) {
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
          Array(limit).fill(null).map((_, index) => (
            <Skeleton
              key={`items-skeleton-${index}`}
              className="h-6 mb-4 rounded-[8px]"
            />
          ))
        }
      </div>
    )
  }

  const list = showAll
    ? items.filter(item => item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    : (defaultItems || items)?.slice(0, limit);

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
              onChange={onChangeSearchInput}
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
              name={name}
              text={item.text}
              value={item.value}
              checked={selected?.has(item.value)}
              endAdornment={item.endAdornment}
              onCheckedChange={() => onClickCheckbox?.(item.value)}
            />
          ))
        }
      </div>

      {
        items.length > limit && (
          <div
            className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}
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
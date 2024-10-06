"use client"

import { FC, HTMLAttributes, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {

}

const SearchInput: FC = (props) => {
  const { ...other } = props;
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <>
      {
        focused &&
        <div
          className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
        />
      }
      <div
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11",
        )}
      >
        <Search
          className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"
        />
        <input
          type="text"
          onFocus={() => setFocused(true)}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          placeholder="Search pizza ..."
          {...other}
        />
      </div>
    </>
  )
}

export { SearchInput }
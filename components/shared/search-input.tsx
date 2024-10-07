"use client"

import { FC, HTMLAttributes, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { ApiRoutes } from "@/services/constants";

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> { }

const SearchInput: FC = (props) => {
  const { ...other } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useClickAway(ref, () => {
    setFocused(false)
  });

  useDebounce(() => {
    Api.products.search(!!searchQuery ? { name: searchQuery } : "")
      .then(data => setProducts(data))
  },
    100,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setProducts([])
    setSearchQuery("");
  }

  return (
    <>
      {
        focused &&
        <div
          className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
        />
      }
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 mx-4",
        )}
      >
        <Search
          className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"
        />
        <input
          type="text"
          name="name"
          value={searchQuery}
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11 z-30"
          placeholder="Search pizza ..."
          {...other}
        />
        {
          products.length > 0 &&
          (
            <div
              className={
                cn(
                  "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                  focused && "visible opacity-100 top-12"
                )
              }
            >
              {
                products.map((product, index) => (
                  <Link
                    key={`${product.id}-${index}`}
                    href={`${ApiRoutes.PRODUCT}/${product.id}`}
                    onClick={onClickItem}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width={32}
                      height={32}
                      className="rounded-sm h-8 w-8"
                    />
                    <span>
                      {product.name}
                    </span>
                  </Link>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export { SearchInput }
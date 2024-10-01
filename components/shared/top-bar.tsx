import { FC } from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";

const TopBar: FC = () => {
  return (
    <div>
      <Categories/>
      <SortPopup/>
    </div>
  )
}

export { TopBar }
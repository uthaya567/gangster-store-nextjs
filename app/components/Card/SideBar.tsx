
import FilterCard from "../Card/FilterCard";
import { Product } from "@/app/lib/products";
type SideBarProps = {
  filteredProducts: Product[];
};
export default function SideBar({ filteredProducts}: SideBarProps) {

  return (
    <>
      <div>
        <div>
          <div className="grid grid-cols-2 lg:gap-3 gap-2  md:grid-cols-3 lg:grid-cols-4 text-[8px] lg:text-[13px] md:text-[12px]">
            {filteredProducts.map((product) => {
              if (!product) return null;
              return (
                <FilterCard
                  key={product.id}
                  product={product}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

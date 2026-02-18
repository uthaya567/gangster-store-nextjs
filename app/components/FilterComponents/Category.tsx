import { useState } from "react";
export type PriceRange = {
    id: number;
    label: string;
    min: number;
    max: number;
};
type CategoryProps = {
    allSubCategories: string[];
    selectedSubCategories: string[];
    setSelectedSubCategories: React.Dispatch<React.SetStateAction<string[]>>;
    subCategoryCounts: Record<string, number>;

    allSizes: string[]
    sizeCounts: Record<string, number>;
    selectedSizes: string[];
    setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;

    selectedPrice: PriceRange | null;
    setSelectedPrice: React.Dispatch<React.SetStateAction<PriceRange | null>>;
    priceCounts: Record<string, number>;
    PRICE_RANGES: PriceRange[];
};

export default function Category({
    allSubCategories,
    selectedSubCategories,
    setSelectedSubCategories,
    subCategoryCounts,
    allSizes,
    selectedSizes,
    setSelectedSizes,
    sizeCounts,
    PRICE_RANGES,
    selectedPrice,
    setSelectedPrice,
    priceCounts,
}: CategoryProps) {
    const [open, setOpen] = useState<null | "Category" | "size" | "Price">(null);
    return (

        <>
            {/* <BtnOpenClose size = {"size"}/> */}
            <div className="py-3">
                <button
                    onClick={() => setOpen(open === "Category" ? null : "Category")}
                    className="flex w-full justify-between font-medium text-lg"
                >
                    Catogory
                    <span>{open === "Category" ? "▲" : "▼"}</span>
                </button>

                {open === "Category" && (
                    <div className="space-y-1">
                        {allSubCategories.map((cat) => (
                            <label
                                key={cat}
                                className="flex items-center justify-between text-lg text-gray-600 font-medium cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedSubCategories.includes(cat)}
                                        onChange={() =>
                                            setSelectedSubCategories((prev) =>
                                                prev.includes(cat)
                                                    ? prev.filter((c) => c !== cat)
                                                    : [...prev, cat]
                                            )
                                        }
                                    />
                                    <span>{cat}</span>
                                </div>

                                <span className="text-gray-500">
                                    {subCategoryCounts[cat] ?? 0}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            {/* Size */}
            <div className="py-2">
                <button
                    onClick={() => setOpen(open === "size" ? null : "size")}
                    className="flex w-full justify-between font-medium text-lg"
                >
                    Size
                    <span>{open === "size" ? "▲" : "▼"}</span>
                </button>

                {open === "size" && (
                    <div className="flex flex-wrap gap-2 text-lg text-gray-600 ">
                        {allSizes.map(size => (
                            <button
                                key={size}
                                type="button"
                                onClick={() =>
                                    setSelectedSizes(prev =>
                                        prev.includes(size)
                                            ? prev.filter(s => s !== size)
                                            : [...prev, size]
                                    )
                                }
                                className={`border rounded-md px-3 py-1 text-sm
                                      ${selectedSizes.includes(size)
                                        ? "border-black font-medium"
                                        : "border-gray-400"
                                    }`}
                            >
                                {size}
                                <span className="text-gray-500 ml-1">
                                    ({sizeCounts[size] ?? 0})
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {/* Size */}
            <div className="py-3">
                <button
                    onClick={() => setOpen(open === "Price" ? null : "Price")}
                    className="flex w-full justify-between font-medium text-lg "
                >
                    Price
                    <span>{open === "Price" ? "▲" : "▼"}</span>
                </button>

                {open === "Price" && (
                    <div className="space-y-2">
                        {PRICE_RANGES.map(p => (
                            <label
                                key={p.id}
                                className="flex items-center justify-between text-sm cursor-pointer"
                            >
                                <div className="flex items-center gap-2 text-lg text-gray-600 ">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={selectedPrice?.id === p.id}
                                        onChange={() => setSelectedPrice(p)}
                                    />
                                    <span>{p.label}</span>
                                </div>
                                <span className="text-gray-500">
                                    {priceCounts[p.id] ?? 0}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, filteredProducts, searchQuery, router } = useAppContext()

  // Show search results when searching, otherwise show popular products
  const displayProducts = searchQuery ? filteredProducts : products;
  const sectionTitle = searchQuery ? `Search results for "${searchQuery}"` : "Popular products";

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">{sectionTitle}</p>
      {searchQuery && (
        <div className="text-left w-full mt-2 text-gray-600">
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {displayProducts.length > 0 ? (
          displayProducts.map((product, index) => <ProductCard key={index} product={product} />)
        ) : searchQuery ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No products found matching "{searchQuery}"</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          products.map((product, index) => <ProductCard key={index} product={product} />)
        )}
      </div>
      {!searchQuery && (
        <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
          See more
        </button>
      )}
      {searchQuery && filteredProducts.length > 0 && (
        <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
          View all search results
        </button>
      )}
    </div>
  );
};

export default HomeProducts;

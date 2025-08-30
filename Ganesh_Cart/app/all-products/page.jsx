'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {

    const { products, filteredProducts, searchQuery } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">
                        {searchQuery ? `Search results for "${searchQuery}"` : "All products"}
                    </p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>
                {searchQuery && (
                    <div className="mt-4 text-gray-600">
                        Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)
                    ) : searchQuery ? (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p className="text-lg">No products found matching "{searchQuery}"</p>
                            <p className="text-sm mt-2">Try searching with different keywords</p>
                        </div>
                    ) : (
                        products.map((product, index) => <ProductCard key={index} product={product} />)
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;

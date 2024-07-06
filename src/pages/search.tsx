// import { useState, useEffect, ChangeEvent } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import ProductCard from '../components/ProductCard';
// import Search from '../components/Search';
// import Filters from '../components/Filters';

// // Other code...

// const SearchPage: React.FC<SearchPageProps> = ({ products }) => {
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [selectedCategory, setSelectedCategory] = useState<string>('');
//     const categories = Array.from(new Set(products.map((product) => product.category)));
//     const router = useRouter();

//     useEffect(() => {
//         const { query } = router.query;
//         if (query) {
//             setSearchQuery(query as string);
//             filterProducts(query as string, selectedCategory);
//         }
//     }, [router.query]);

//     useEffect(() => {
//         filterProducts(searchQuery, selectedCategory);
//     }, [searchQuery, selectedCategory]);

//     const filterProducts = (query: string, category: string) => {
//         let updatedProducts = products;

//         if (category) {
//             updatedProducts = updatedProducts.filter((product) => product.category === category);
//         }

//         if (query) {
//             updatedProducts = updatedProducts.filter((product) =>
//                 product.name.toLowerCase().includes(query.toLowerCase())
//             );
//         }

//         setFilteredProducts(updatedProducts);
//     };

//     const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const query = e.target.value;
//         setSearchQuery(query);
//         router.push(`/search?query=${query}`, undefined, { shallow: true });
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="container mx-auto p-4 flex pt-16">
//                 <div className="w-1/4">
//                     <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
//                     <Filters categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
//                 </div>
//                 <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     {filteredProducts.length > 0 ? (
//                         filteredProducts.slice(0, 9).map((product) => (
//                             <ProductCard
//                                 key={product.id}
//                                 id={product.id}
//                                 name={product.name}
//                                 price={product.price}
//                                 image={product.image}
//                             />
//                         ))
//                     ) : (
//                         <p>No products found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Other code...

// export default SearchPage;

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Navbar from '@components/components/navbar';
import ProductCard from '@components/components/productCard';
import Filters from '@components/components/filters';
import Search from '@components/components/search';
import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface Product {
    description: string;
    title: string;
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface ProductPageProps {
    products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const categories = Array.from(new Set(products.map((product) => product.category)));

    const productsPerPage = 8;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    useEffect(() => {
        filterProducts(searchQuery, selectedCategory, sortOrder);
    }, [searchQuery, selectedCategory, sortOrder]);

    const filterProducts = async (query: string, category: string, sortOrder: string) => {
        let updatedProducts = products;

        if (category) {
            updatedProducts = updatedProducts.filter((product) => product.category === category);
        }

        if (query) {
            updatedProducts = updatedProducts.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (sortOrder) {
            const res = await axios.get(`https://fakestoreapi.com/products?sort=${sortOrder}`);
            updatedProducts = res.data;
        }

        setFilteredProducts(updatedProducts);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSortOrder(event.target.value as string);
    };

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const displayProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div>
            <Navbar />
            <Grid container>
                <Grid md={6} sm={12} xs={12} lg={3}>
                    <Box m={3}>
                        <Box mb={4}>
                            <Typography variant='body1'> Search Product</Typography>
                            <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                        </Box>
                        <Box mb={4}>
                            <Typography variant='body1'> Filter Product</Typography>
                            <Filters categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                        </Box>
                        <Box>
                            <Typography variant='body1'> Sort By</Typography>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Price</InputLabel>
                                <Select value={sortOrder} onChange={(e: any) => handleSortChange(e.target.value)} label="Price">
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="asc">Price: Low to High</MenuItem>
                                    <MenuItem value="desc">Price: High to Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
                <Grid md={6} sm={12} xs={12} lg={9}>
                    <Box mr={4}>
                        <Grid container>
                            {displayProducts.map((product) => (
                                <Grid item md={6} sm={12} xs={12} lg={4} key={product.id}>
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.image}
                                        description={product.description}
                                        title={product.title}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box mt={4} display="flex" justifyContent="center">
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductPage;

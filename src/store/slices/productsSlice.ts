
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchTerm: string;
}

// Mock API data
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: "Premium Coffee Beans",
    price: 24.99,
    description: "Organic single-origin coffee beans roasted to perfection.",
    category: "food",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
    rating: { rate: 4.8, count: 89 }
  },
  {
    id: 3,
    title: "Minimalist Watch",
    price: 199.99,
    description: "Elegant minimalist watch with leather strap and Swiss movement.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: { rate: 4.3, count: 156 }
  },
  {
    id: 4,
    title: "Smartphone Stand",
    price: 15.99,
    description: "Adjustable smartphone stand for desk use with anti-slip base.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop",
    rating: { rate: 4.1, count: 203 }
  },
  {
    id: 5,
    title: "Yoga Mat",
    price: 39.99,
    description: "Eco-friendly yoga mat with superior grip and cushioning.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    rating: { rate: 4.6, count: 78 }
  },
  {
    id: 6,
    title: "Leather Backpack",
    price: 129.99,
    description: "Vintage leather backpack with multiple compartments and laptop sleeve.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: { rate: 4.4, count: 92 }
  }
];

// Simulate API call
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedCategory: 'all',
  searchTerm: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSelectedCategory, setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;

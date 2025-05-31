
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation object
const translations = {
  en: {
    // Navigation
    home: 'Home',
    shop: 'Shop',
    about: 'About',
    contact: 'Contact',
    signIn: 'Sign In',
    
    // Home page
    welcomeTitle: 'Welcome to ShopHub',
    welcomeSubtitle: 'Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.',
    startShopping: 'Start Shopping',
    getPremium: 'Get Premium - $29.99',
    whyChoose: 'Why Choose ShopHub?',
    whyChooseSubtitle: 'We\'re committed to providing you with the best shopping experience possible.',
    qualityProducts: 'Quality Products',
    qualityProductsDesc: 'Carefully curated selection of high-quality products from trusted brands.',
    customerSupport: 'Customer Support',
    customerSupportDesc: '24/7 customer support to help you with any questions or concerns.',
    secureShopping: 'Secure Shopping',
    secureShoppingDesc: 'Your data and payments are protected with industry-leading security.',
    
    // Shop page
    shopTitle: 'Shop Our Products',
    shopSubtitle: 'Discover amazing products at great prices',
    categories: 'Categories',
    searchPlaceholder: 'Search products...',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    clearCart: 'Clear Cart',
    addedToCart: 'Added to cart',
    addedToCartDesc: 'has been added to your cart.',
    
    // General
    loading: 'Loading...',
    error: 'Error',
    noProducts: 'No products found.',
  },
  vi: {
    // Navigation
    home: 'Trang chủ',
    shop: 'Cửa hàng',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    signIn: 'Đăng nhập',
    
    // Home page
    welcomeTitle: 'Chào mừng đến với ShopHub',
    welcomeSubtitle: 'Khám phá những sản phẩm tuyệt vời với giá cả không thể tin được. Cửa hàng một điểm đến cho mọi nhu cầu của bạn.',
    startShopping: 'Bắt đầu mua sắm',
    getPremium: 'Nâng cấp Premium - $29.99',
    whyChoose: 'Tại sao chọn ShopHub?',
    whyChooseSubtitle: 'Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tốt nhất có thể.',
    qualityProducts: 'Sản phẩm chất lượng',
    qualityProductsDesc: 'Lựa chọn cẩn thận các sản phẩm chất lượng cao từ những thương hiệu uy tín.',
    customerSupport: 'Hỗ trợ khách hàng',
    customerSupportDesc: 'Hỗ trợ khách hàng 24/7 để giúp bạn với mọi câu hỏi hoặc thắc mắc.',
    secureShopping: 'Mua sắm an toàn',
    secureShoppingDesc: 'Dữ liệu và thanh toán của bạn được bảo vệ bằng công nghệ bảo mật hàng đầu.',
    
    // Shop page
    shopTitle: 'Cửa hàng sản phẩm',
    shopSubtitle: 'Khám phá những sản phẩm tuyệt vời với giá cả hấp dẫn',
    categories: 'Danh mục',
    searchPlaceholder: 'Tìm kiếm sản phẩm...',
    addToCart: 'Thêm vào giỏ',
    buyNow: 'Mua ngay',
    
    // Cart
    shoppingCart: 'Giỏ hàng',
    cartEmpty: 'Giỏ hàng của bạn đang trống',
    total: 'Tổng cộng',
    checkout: 'Thanh toán',
    clearCart: 'Xóa giỏ hàng',
    addedToCart: 'Đã thêm vào giỏ hàng',
    addedToCartDesc: 'đã được thêm vào giỏ hàng của bạn.',
    
    // General
    loading: 'Đang tải...',
    error: 'Lỗi',
    noProducts: 'Không tìm thấy sản phẩm.',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

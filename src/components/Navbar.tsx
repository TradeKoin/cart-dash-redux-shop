
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart } from '../store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { itemCount } = useAppSelector(state => state.cart);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-card border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShopHub</h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-muted-foreground hover:text-blue-600'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/shop"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/shop') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-muted-foreground hover:text-blue-600'
              }`}
            >
              {t('shop')}
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-muted-foreground hover:text-blue-600'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-muted-foreground hover:text-blue-600'
              }`}
            >
              {t('contact')}
            </Link>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            {/* User Menu */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{t('signIn')}</span>
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

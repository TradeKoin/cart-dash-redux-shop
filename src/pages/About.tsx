
import React from 'react';
import { Heart, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ShopHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about bringing you the best shopping experience with quality products, 
            competitive prices, and exceptional customer service.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, ShopHub started as a small idea to make online shopping more 
              accessible and enjoyable for everyone. What began as a passion project has grown 
              into a trusted platform serving thousands of customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that great products should be available to everyone, regardless of 
              their location or budget. That's why we work tirelessly to curate the best 
              selection of products at competitive prices.
            </p>
            <p className="text-gray-600">
              Today, we're proud to be your go-to destination for electronics, fashion, 
              home goods, and much more. Our journey continues as we expand our offerings 
              and improve our services.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
              alt="Our team" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">Building Something Special</h3>
            <p className="text-gray-600">
              Every day, our team works to create meaningful connections between 
              great products and the people who need them.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer First</h3>
              <p className="text-gray-600">
                Everything we do is centered around providing the best possible 
                experience for our customers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
              <p className="text-gray-600">
                We're committed to making quality products accessible to customers 
                around the world.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from product selection 
                to customer service.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

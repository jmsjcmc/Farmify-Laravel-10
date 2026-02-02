import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "./Partials/Navbar";

const categories = ["Fruits", "Vegetables", "Dairy", "Honey", "Grains"];
const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (Math.random() * 10 + 1).toFixed(2),
    category: categories[i % categories.length],
    image: `https://picsum.photos/300/300?random=${i + 1}`,
}));

export default function EcommerceHome() {
    const { auth } = usePage().props;
    const user = auth.user || { name: "Guest" };
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
         <div className="min-h-screen bg-[#F8F9FA]">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Search */}
        <header className="flex flex-col sm:flex-row sm:justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1B4332] mb-4 sm:mb-0">
            Farmify Marketplace
          </h1>
          <div className="flex w-full sm:max-w-md">
            <Input
              placeholder="Search products..."
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="ml-2 bg-[#FFB703] hover:bg-[#e6a200] text-[#2D3436]">
              <Search size={20} />
            </Button>
          </div>
        </header>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white shadow-md rounded-2xl hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-[#2D3436] mb-1">
                  {product.name}
                </h3>
                <p className="text-[#40916C] font-medium mb-2">${product.price}</p>
                <Tag className="text-sm mb-3">{product.category}</Tag>
                <Button className="w-full bg-[#FFB703] hover:bg-[#e6a200] text-[#2D3436] flex items-center justify-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination / Load More */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  );
}

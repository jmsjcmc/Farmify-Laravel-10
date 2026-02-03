import ConsumerLayout from '@/Layouts/ConsumerLayout'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Search } from 'lucide-react'

const categories = ["Fruits", "Vegetables", "Dairy", "Honey", "Grains"]

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 10 + 1).toFixed(2),
  category: categories[i % categories.length],
  image: `https://picsum.photos/300/300?random=${i + 1}`,
}))

export default function EcommerceHome() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Header */}
      <header className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-[#1B4332]">
          Farmify Marketplace
        </h1>

        <div className="flex w-full sm:max-w-md">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="ml-2 bg-[#FFB703] hover:bg-[#e6a200] text-[#2D3436]">
            <Search size={18} />
          </Button>
        </div>
      </header>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...categories].map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="transition-shadow hover:shadow-lg rounded-2xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-48 rounded-t-2xl"
            />
            <CardContent className="p-4">
              <h3 className="mb-1 text-lg font-semibold">
                {product.name}
              </h3>
              <p className="mb-2 font-medium text-[#40916C]">
                ${product.price}
              </p>

              <Button className="w-full bg-[#FFB703] hover:bg-[#e6a200] text-[#2D3436]">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Button variant="outline">Load More</Button>
      </div>
    </>
  )
}

EcommerceHome.layout = (page) => <ConsumerLayout>{page}</ConsumerLayout>

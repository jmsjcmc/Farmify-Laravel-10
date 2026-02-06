import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Link, usePage } from "@inertiajs/react";
import { Leaf, Settings, ShoppingBasket, Users } from "lucide-react";

export default function LandingPage() {
    const { auth } = usePage().props;
    const isAuth = auth?.user;
    return (
         <div className="min-h-screen bg-[#F7FAFC] text-[#4A5568]">
      {/* Navigation */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="text-xl font-bold text-[#2D5A27]">Farmify</div>
        <nav className="flex items-center gap-6">
          <Link
            href={isAuth ? "/consumer/ecommerce" : route("guest.ecommerce")}
            className="hover:text-[#2D5A27]"
          >
            Marketplace
          </Link>
          <a href={isAuth ? route("job-find") : route("guest.jobs")} className="hover:text-[#2D5A27]">
            Jobs
          </a>
          <a href="#about" className="hover:text-[#2D5A27]">
            About
          </a>
          {!isAuth && (
            <>
              <Link href="/login" className="hover:text-[#2D5A27]">
                Login
              </Link>
              <Button
                asChild
                className="bg-[#F6AD55] text-black hover:bg-[#ED8936]"
              >
                <Link href="/register">Join Farmify</Link>
              </Button>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="grid items-center gap-12 px-8 py-24 md:grid-cols-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D5A27] mb-6">
            The Pulse of the Modern Farm.
          </h1>
          <p className="mb-8 text-lg">
            From seed to sale, Farmify connects owners, managers, and laborers
            in one powerful ecosystem. Grow your farm, find your team, and
            reach your market—all in one place.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#2D5A27] hover:bg-[#244A20]"
          >
            <Link href={isAuth ? "/consumer/ecommerce" : "/guest/ecommerce"}>
              Start Your Harvest
            </Link>
          </Button>
        </div>
        <div className="overflow-hidden shadow-lg rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            alt="Farm"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="px-8 py-20 text-center bg-white">
        <h2 className="text-3xl font-bold text-[#2D5A27] mb-4">
          Agriculture is complex. Managing it shouldn't be.
        </h2>
        <p className="max-w-3xl mx-auto">
          Whether you're a consumer looking for the freshest produce or an
          owner scaling a multi-acre operation, Farmify removes the friction
          from the field.
        </p>
      </section>

      {/* Role-Based Grid */}
      <section className="grid gap-6 px-8 py-20 md:grid-cols-4">
        {[
          {
            title: "Owners",
            text: "Verify your land and unlock professional management tools.",
            icon: <Leaf />,
          },
          {
            title: "Managers",
            text: "Oversee operations, track labor, and hit harvest goals with ease.",
            icon: <Settings />,
          },
          {
            title: "Laborers",
            text: "Your next opportunity is one tap away. Find consistent work with verified farms.",
            icon: <Users />,
          },
          {
            title: "Consumers",
            text: "Farm-to-table isn't a trend; it's a direct connection. Buy fresh, buy local.",
            icon: <ShoppingBasket />,
          },
        ].map((item) => (
          <Card key={item.title} className="shadow-md">
            <CardContent className="p-6">
              <div className="text-[#2D5A27] mb-4">{item.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quote */}
      <section className="px-8 py-24 text-center bg-[#2D5A27] text-white">
        <blockquote className="max-w-4xl mx-auto text-3xl font-semibold">
          “We aren't just building a marketplace; we're building the
          infrastructure for the next generation of farmers.”
        </blockquote>
      </section>

      {/* Small Business Reassurance */}
      <section className="px-8 py-20 text-center bg-white">
        <h2 className="text-2xl font-bold text-[#2D5A27] mb-4">
          Scaling with you.
        </h2>
        <p className="max-w-2xl mx-auto">
          No HR team? No problem. Our automated tools handle the heavy lifting
          of hiring and sales, so you can focus on the soil.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-sm text-[#4A5568]">
        Built by Farmers, for Farmers
      </footer>
    </div>
  );
}

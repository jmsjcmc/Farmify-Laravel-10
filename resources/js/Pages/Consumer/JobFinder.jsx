import {
  Card,
  CardContent,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import ConsumerLayout from "@/Layouts/ConsumerLayout";

const jobCategories = ["Agriculture", "Livestock", "Dairy", "Honey", "Grains"];
const jobLocations = ["Davao", "Manila", "Cebu"];

const sampleJobs = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Job ${i + 1}`,
  company: `Company ${i + 1}`,
  location: jobLocations[i % jobLocations.length],
  category: jobCategories[i % jobCategories.length],
  posted_at: new Date(Date.now() - i * 86400000).toISOString(),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
}));

export default function JobFinder() {
  const { auth } = usePage().props;
  const user = auth.user || { name: "Guest" };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredJobs = sampleJobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All" || job.location === selectedLocation;
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
      <div className="min-h-screen bg-[#F8F9FA] px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col gap-4 mb-8 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl font-bold text-[#1B4332]">Job Finder</h1>

          {/* Filters & Search */}
          <div className="flex flex-col items-start w-full gap-2 sm:flex-row sm:items-center sm:w-auto">
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {jobCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                {jobLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-[#FFB703] hover:bg-[#e6a200] text-[#2D3436]">
              Search
            </Button>
          </div>
        </header>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="flex flex-col transition-shadow bg-white shadow-md rounded-2xl hover:shadow-lg"
              >
                <CardContent className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-[#1B4332]">
                    {job.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                  <Badge
                    variant="outline"
                    className="px-2 py-1 text-xs rounded-full w-max"
                  >
                    {job.category}
                  </Badge>
                  <p className="mt-2 text-sm line-clamp-3">
                    {job.description}
                  </p>
                  <Button className="mt-auto bg-[#1B4332] hover:bg-[#166534] text-white">
                    View Details
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Posted on {new Date(job.posted_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="py-12 text-center col-span-full text-muted-foreground">
              No jobs found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
  );
}

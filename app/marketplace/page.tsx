"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, MapPin } from "lucide-react";

const mockProviders = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Preventive Medicine",
    location: "New York, USA",
    rating: 4.8,
    price: "150",
    currency: "USDC",
  },
  // Add more mock providers...
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Healthcare Marketplace</h1>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProviders.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.specialization}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{provider.rating}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{provider.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {provider.price} {provider.currency}
                </span>
                <Button>Book Appointment</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
// pages/services.js
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { services } from "@/constants";
import Heading from "@/components/Heading";
import { Service } from "@/types";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-4 md:py-16 pb-8` px-4 md:px-6 lg:px-8">
        <div className="w-full md:container max-w-7xl mx-auto">
          <Heading
            smText="Discover our comprehensive range of services."
            lgText="Our Services"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-white">
      <CardHeader className="pb-4">
        <div className="mb-3">
          <div className="h-12 w-12 text-black">{service.icon}</div>
        </div>
        <CardTitle className="text-2xl font-semibold">
          {service.title}
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 mt-auto">
        <Link href={service.link} passHref>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

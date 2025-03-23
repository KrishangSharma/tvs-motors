import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/Heading";
import { services } from "@/constants";
import { Service } from "@/types";

export default function ServicesPage() {
  return (
    <div className="min-h-screen max-w-7xl container mx-auto">
      <div className="mx-auto py-8 md:py-16">
        <Heading
          smText="Discover our comprehensive range of services."
          lgText="Our Services"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
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
    <Card className="h-full flex flex-col border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
      <CardHeader className="space-y-3">
        <div className="h-12 w-12 text-black">{service.icon}</div>
        <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
        <CardDescription className="text-gray-600">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <Link href={service.link} className="w-full">
          <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

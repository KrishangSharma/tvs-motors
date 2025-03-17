import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/Heading";
import { services } from "@/constants";
import Link from "next/link";

const ServicesSection = () => {
  return (
    <section className="container sm:max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-12">
        <Heading smText="WHAT WE OFFER" lgText="Our Services" />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50"
          >
            <CardHeader className="pb-2">
              <div className="mb-4">{service.icon}</div>
              <CardTitle className="text-xl font-bold">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground min-h-[80px]">
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={service.link}>Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

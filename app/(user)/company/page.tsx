import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, History } from "lucide-react";
import {
  companyFeatures,
  globalPresence,
  leadershipTeam,
  milestones,
  missionPoints,
  valuesPoints,
  visionPoints,
} from "@/constants";
import HeroImage from "@/public/header-images/tvs-sabhrawal.jpg";
import TVSFactory from "@/public/about/main.jpg";
import Main from "@/public/about/tvs-sabhrawal.jpg";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={HeroImage}
            alt="TVS Motors Headquarters"
            width={1200}
            height={600}
            className="w-full h-[60vh] object-cover"
          />
          <div className="container absolute inset-0 z-20 flex flex-col justify-center items-start">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Driving Innovation Since 1978
              </h1>
              <p className=" text-white/90 md:text-xl">
                TVS Motor Company is a reputed two and three-wheeler
                manufacturer globally, championing progress through sustainable
                mobility with a focus on innovation and quality.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <Badge className="inline-block rounded-full px-3 py-1 text-sm">
                About Sabharwal TVS
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                A Legacy of Excellence
              </h2>
              <p className="text-muted-foreground md:text-xl">
                With over two decades of quality experience in diverse
                businesses, the Sabharwal Group has carved a unique niche for
                itself in North India. Sabharwal TVS has raised the bar even
                higher for others emulate. It is one of the leading dealership
                for TVS Motor Company in Delhi & NCR.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {companyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={Main}
                alt="TVS Motors Factory"
                fill
                className="object-fill"
              />
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <Tabs defaultValue="vision" className="w-full">
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
              <Badge className="inline-block rounded-full px-3 py-1 text-sm">
                Our Philosophy
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Guided by Purpose
              </h2>
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="vision">Vision</TabsTrigger>
                <TabsTrigger value="mission">Mission</TabsTrigger>
                <TabsTrigger value="values">Values</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="vision"
              className="space-y-4 pointer-events-none  "
            >
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be one of the top two-wheeler manufacturers in the world,
                    delivering superior customer experience through innovative
                    mobility solutions while maintaining the highest standards
                    of quality and sustainability.
                  </p>
                  <ul className="space-y-2">
                    {visionPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl ">
                  <Image
                    src={TVSFactory}
                    alt="TVS Vision"
                    fill
                    className="object-fill"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="mission" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide superior mobility experiences that exceed
                    customer expectations through innovative products,
                    processes, and services while fostering a culture of
                    excellence, integrity, and sustainability.
                  </p>
                  <ul className="space-y-2">
                    {missionPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={TVSFactory}
                    alt="TVS Mission"
                    fill
                    className="object-fill"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="values" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Our Values</h3>
                  <p className="text-muted-foreground">
                    Our core values form the foundation of everything we do at
                    TVS Motors, guiding our decisions, actions, and interactions
                    with all stakeholders.
                  </p>
                  <ul className="space-y-2">
                    {valuesPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={TVSFactory}
                    alt="TVS Mission"
                    fill
                    className="object-fill"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container py-12 md:py-24">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
            <Badge className="inline-block rounded-full px-3 py-1 text-sm">
              Leadership
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Meet Our Leadership Team
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl">
              Our experienced leadership team brings together decades of
              industry expertise to drive TVS Motors towards continued success
              and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center max-w-3xl mx-auto">
            {leadershipTeam.map((leader, index) => (
              <Card key={index} className="overflow-hidden w-[300px]">
                <div className="aspect-square relative bg-gray-300">
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={`${leader.name} - ${leader.position}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="h-[120px]">
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <CardDescription>{leader.position}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gray-200 mb-10">
          <div className="container py-12 md:py-24">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <Badge className="inline-block rounded-full px-3 py-1 text-sm">
                Join Our Journey
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Be Part of Our Success Story
              </h2>
              <p className="text-muted-foreground md:text-xl">
                At TVS Motors, we&apos;re always looking for talented
                individuals who share our passion for innovation and excellence.
                Join us in shaping the future of mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link href="/careers/apply">
                  <Button size="lg">Explore Careers</Button>
                </Link>
                <Link href="/contact-us">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

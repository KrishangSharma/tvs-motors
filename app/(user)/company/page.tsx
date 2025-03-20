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
import { Badge } from "@/components/ui/badge";

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
              <p className="text-white/90 md:text-xl">
                TVS Motor Company is a reputed two and three-wheeler
                manufacturer globally, championing progress through sustainable
                mobility with a focus on innovation and quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg">
                  Our Legacy
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-background/20 hover:bg-background/30 text-white border-white/20"
                >
                  Investor Relations
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <Badge className="inline-block rounded-full px-3 py-1 text-sm">
                About TVS Motors
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                A Legacy of Excellence
              </h2>
              <p className="text-muted-foreground md:text-xl">
                TVS Motor Company is the third largest two-wheeler manufacturer
                in India and one among the top ten in the world, with annual
                revenue of more than ₹20,000 crore (US$2.5 billion), and is the
                flagship company of the ₹50,000 crore (US$6.26 billion) TVS
                Group.
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
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-300">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="TVS Motors Factory"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-muted">
          <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
              <Badge className="inline-block rounded-full px-3 py-1 text-sm">
                Our Journey
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Milestones That Define Us
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-3xl">
                From our humble beginnings to becoming a global automotive
                leader, our journey has been marked by innovation, perseverance,
                and a commitment to excellence.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {milestones.map((milestone, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      {milestone.year}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
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
            <TabsContent value="vision" className="space-y-4">
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
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="TVS Vision"
                    width={600}
                    height={400}
                    className="object-cover"
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
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="TVS Mission"
                    width={600}
                    height={400}
                    className="object-cover"
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
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-300">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="TVS Values"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="container py-12 md:py-24">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Global Presence
                </h2>
                <p className="md:text-xl">
                  TVS Motor Company has established a strong global footprint
                  with operations spanning across continents, serving customers
                  in over 60 countries worldwide.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {globalPresence.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary-foreground/10 p-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-primary-foreground/80">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" size="lg" className="mt-4">
                  Explore Our Global Network
                </Button>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-300">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="TVS Global Presence"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadershipTeam.map((leader, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative bg-gray-300">
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={`${leader.name} - ${leader.position}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{leader.name}</CardTitle>
                  <CardDescription>{leader.position}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted/50">
          <div className="container py-12 md:py-24">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge className="inline-block rounded-full px-3 py-1 text-sm">
                  Join Our Journey
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Be Part of Our Success Story
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  At TVS Motors, we&apos;re always looking for talented
                  individuals who share our passion for innovation and
                  excellence. Join us in shaping the future of mobility.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg">Explore Careers</Button>
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg bg-gray-300">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="TVS Workplace"
                      width={300}
                      height={300}
                      className="aspect-square object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg bg-gray-300">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="TVS Team"
                      width={300}
                      height={300}
                      className="aspect-square object-cover"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg bg-gray-300">
                  <Image
                    src="/placeholder.svg?height=600&width=300"
                    alt="TVS Culture"
                    width={300}
                    height={600}
                    className="h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

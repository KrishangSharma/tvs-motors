"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Award } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface AwardCardProps {
  award: Award;
}

export function AwardCard({ award }: AwardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {award.image ? (
            <Image
              src={award.image || "/placeholder.svg"}
              alt={award.title}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
              <Trophy className="h-16 w-16 text-primary/40" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="font-medium">
              {award.year}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6 space-y-3">
          <h3 className="text-xl font-bold line-clamp-2">{award.title}</h3>
          {award.organization && (
            <p className="text-sm text-muted-foreground">
              Awarded by:{" "}
              <span className="font-medium">{award.organization}</span>
            </p>
          )}
          {award.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {award.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export function AwardsHero() {
  return (
    <div className="relative overflow-hidden bg-gray-200 py-20 md:py-28">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex mb-6"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Award-Winning Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Celebrating our commitment to quality, innovation, and customer
            satisfaction in the automotive industry through the years.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </div>
  );
}

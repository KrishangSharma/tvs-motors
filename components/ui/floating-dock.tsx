/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/
"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, useEffect } from "react";

export const FloatingDock = ({
  items,
  onFilterClick,
  onMoreOptionsClick,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; value: string }[];
  onFilterClick: (value: string) => void;
  onMoreOptionsClick: () => void;
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        onFilterClick={onFilterClick}
        onMoreOptionsClick={onMoreOptionsClick}
        className={desktopClassName}
      />
      <FloatingDockMobile
        items={items}
        onFilterClick={onFilterClick}
        onMoreOptionsClick={onMoreOptionsClick}
        className={mobileClassName}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  onFilterClick,
  onMoreOptionsClick,
  className,
}: {
  items: { title: string; icon: React.ReactNode; value: string }[];
  onFilterClick: (value: string) => void;
  onMoreOptionsClick: () => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col items-end gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                className="flex items-center gap-2 min-w-max bg-white dark:bg-neutral-800 rounded-lg px-3 py-1 shadow-lg border"
              >
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {item.title}
                </p>
                <button
                  onClick={() => {
                    if (item.value === "more") {
                      onMoreOptionsClick();
                    } else {
                      onFilterClick(item.value);
                    }
                    setOpen(false);
                  }}
                  className="h-8 w-8 rounded-full bg-gray-100 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-5 w-5 flex items-center justify-center">
                    {item.icon}
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <Filter className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  onFilterClick,
  onMoreOptionsClick,
  className,
}: {
  items: { title: string; icon: React.ReactNode; value: string }[];
  onFilterClick: (value: string) => void;
  onMoreOptionsClick: () => void;
  className?: string;
}) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset mouseX when route changes
  useEffect(() => {
    mouseX.set(Number.POSITIVE_INFINITY);
  }, [mouseX]);

  return (
    <motion.div
      onMouseMove={(e) => isLargeScreen && mouseX.set(e.pageX)}
      onMouseLeave={() => isLargeScreen && mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "mx-auto flex h-20 gap-8 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-8 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <FilterIconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
          onClick={() => {
            if (item.value === "more") {
              onMoreOptionsClick();
            } else {
              onFilterClick(item.value);
            }
          }}
          isLargeScreen={isLargeScreen}
        />
      ))}
    </motion.div>
  );
};

function FilterIconContainer({
  mouseX,
  title,
  icon,
  value,
  onClick,
  isLargeScreen,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  value: string;
  onClick: () => void;
  isLargeScreen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    if (!isLargeScreen) return 0;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [16, 32, 16] // Reduced from [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [16, 32, 16] // Reduced from [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <motion.div
        ref={ref}
        style={{
          width: isLargeScreen ? width : 40,
          height: isLargeScreen ? height : 40,
        }}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center"
      >
        <motion.div
          style={{
            width: isLargeScreen ? widthIcon : 20,
            height: isLargeScreen ? heightIcon : 20,
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
      <span className="text-xs text-neutral-700 dark:text-neutral-200 whitespace-nowrap">
        {title}
      </span>
    </button>
  );
}

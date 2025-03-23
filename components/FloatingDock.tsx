import { FloatingDock } from "@/components/ui/floating-dock";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

export const filterOptions = [
  {
    title: "Price: Low",
    icon: <ArrowUpDown className="text-neutral-500" />,
    value: "price-low",
  },
  {
    title: "Price: High",
    icon: <ArrowUpDown className="text-neutral-500" />,
    value: "price-high",
  },
  {
    title: "Name: A-Z",
    icon: <ArrowDownAZ className="text-neutral-500" />,
    value: "name-asc",
  },
  {
    title: "Name: Z-A",
    icon: <ArrowUpAZ className="text-neutral-500" />,
    value: "name-desc",
  },
  {
    title: "More Options",
    icon: <MoreHorizontal className="text-neutral-500" />,
    value: "more",
  },
];

export function FloatingDockDemo({
  onFilterClick,
  onMoreOptionsClick,
}: {
  onFilterClick: (value: string) => void;
  onMoreOptionsClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-20 w-full fixed bottom-4 left-0 z-50">
      <FloatingDock
        items={filterOptions}
        onFilterClick={onFilterClick}
        onMoreOptionsClick={onMoreOptionsClick}
        desktopClassName="hidden md:flex border shadow-xl"
        mobileClassName="block md:hidden absolute right-5 bottom-0 border rounded-full shadow-xl"
      />
    </div>
  );
}

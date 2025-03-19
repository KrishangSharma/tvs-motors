import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { dockLinks } from "@/constants";

export function FloatingDockDemo() {
  return (
    <div className="flex items-center justify-center h-20 w-full fixed bottom-4 left-0 z-50">
      <FloatingDock
        items={dockLinks}
        desktopClassName="border shadow-xl"
        mobileClassName="hidden absolute right-5 bottom-0 border rounded-full shadow-xl"
      />
    </div>
  );
}

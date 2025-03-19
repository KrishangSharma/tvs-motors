"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [value, setValue] = useState("");
  const handleClear = () => {
    setValue("");
  };
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search TSV Motors"
        className="pr-10 min-w-[220px] focus-visible:ring-0 focus:shadow-md"
      />
      {value ? (
        <XIcon
          className="h-4 w-4 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground"
          onClick={handleClear}
        />
      ) : (
        <SearchIcon className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
      )}
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

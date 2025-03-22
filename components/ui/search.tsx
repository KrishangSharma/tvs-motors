"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import SearchResults from "./search-results";

export default function Search() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setValue("");
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setValue("");
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ml-auto mr-5 lg:m-0" ref={searchRef}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="Search TSV Motors"
        className="pr-10 w-[200px] md:min-w-[300px] focus-visible:ring-0 focus:shadow-md bg-white"
      />
      {value ? (
        <XIcon
          className="h-4 w-4 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground"
          onClick={handleClear}
        />
      ) : (
        <SearchIcon className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
      )}
      {isFocused && (
        <SearchResults query={value} onClose={() => setIsFocused(false)} />
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

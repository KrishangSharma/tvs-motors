"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMobile } from "@/hooks/use-mobile";
import Image from "next/image";

type SearchResult = {
  _id: string;
  type: string;
  model: string;
  slug: { current: string };
  images: { asset: { url: string } }[];
};

export default function SearchCommand() {
  const router = useRouter();
  const isMobile = useMobile();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);

  // Function to search vehicles
  const searchVehicles = React.useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const searchGroqQuery = groq`
        *[_type in ["motorcycle", "scooter", "moped", "electric"] && (
          model match "*${searchQuery}*" ||
          description match "*${searchQuery}*"
        )] {
          _id,
          type,
          model,
          "slug": slug.current,
          "images": images[]{
            "asset": {
              "url": asset->url
            }
          }
        }
      `;

      const data = await client.fetch<SearchResult[]>(searchGroqQuery);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  }, []);

  // Handle input change with debounce
  const handleInputChange = React.useCallback(
    (value: string) => {
      setQuery(value);
      const timeoutId = setTimeout(() => {
        searchVehicles(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [searchVehicles]
  );

  // Handle selection
  const handleSelect = React.useCallback(
    (id: string) => {
      const selected = results.find((item) => item._id === id);
      if (selected) {
        router.push(`/product/${selected.type}/${selected.slug}`);
        setOpen(false);
      }
    },
    [results, router]
  );

  const SearchTrigger = React.useMemo(() => {
    if (isMobile) {
      return (
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto mr-5"
          onClick={() => {
            setQuery("");
            setResults([]);
            setOpen(true);
          }}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        className="justify-start text-sm text-muted-foreground min-w-[250px] ml-auto mr-5"
        onClick={() => {
          setQuery("");
          setResults([]);
          setOpen(true);
        }}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search TVS Motors</span>
      </Button>
    );
  }, [isMobile]);

  return (
    <>
      {SearchTrigger}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search TVS Motors..."
            value={query}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm">
              {query ? "No results found." : "Start typing to search..."}
            </CommandEmpty>
            {query && results.length > 0 && (
              <CommandGroup heading="Vehicles">
                {results.map((item) => (
                  <CommandItem
                    key={item._id}
                    value={item.model}
                    onSelect={() => handleSelect(item._id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="h-24 w-36 overflow-hidden rounded-md">
                        <Image
                          src={item.images[0]?.asset.url}
                          alt={item.model}
                          className="h-full w-full aspect-video object-contain"
                          width={100}
                          height={100}
                          quality={100}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium ">{item.model}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

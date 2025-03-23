import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SheetClose } from "./sheet";

interface SearchResult {
  _id: string;
  type: string;
  model?: string;
  title?: string;
  slug: {
    current: string;
  };
  images?: {
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchContent = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchQuery = groq`
          *[_type in ["motorcycle", "scooter", "moped", "electric"] && (
            model match "*${query}*" ||
            description match "*${query}*"
          )] {
            _id,
            type,
            model,
            slug,
            images
          }
        `;

        const data = await client.fetch(searchQuery);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!query.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-[100] max-h-[400px] overflow-y-auto">
      {loading ? (
        <div className="p-4 text-center text-gray-500">Searching...</div>
      ) : results.length > 0 ? (
        <div className="py-2">
          {results.map((result) => (
            <SheetClose asChild key={result._id}>
              <Link
                href={`/product/${result.type}/${result.slug.current}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                onClick={onClose}
              >
                {result.images && result.images[0] && (
                  <div className="w-16 h-16 relative">
                    <Image
                      src={urlFor(result.images[0]).url()}
                      alt={result.model || ""}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{result.model}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {result.type}
                  </p>
                </div>
              </Link>
            </SheetClose>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">No results found</div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, icon, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFileName(e.target.files[0].name);
      } else {
        setFileName("");
      }

      // Call the original onChange if it exists
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="relative">
        <input
          type="file"
          className={cn("hidden", className)}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center gap-2">
          <label
            htmlFor={props.id}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {fileName ? fileName : props.placeholder || "Choose file..."}
          </label>
          <label
            htmlFor={props.id}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          >
            Browse
          </label>
        </div>
      </div>
    );
  }
);
FileInput.displayName = "FileInput";

export { FileInput };

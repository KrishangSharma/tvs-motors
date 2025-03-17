import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormWrapperProps } from "@/types";

export function FormWrapper({
  title,
  description,
  children,
  footer,
}: FormWrapperProps) {
  return (
    <Card className="w-full max-w-2xl shadow-lg md:shadow-none md:border-none ">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FormWrapper } from "../FormWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { emiFormSchema } from "@/lib/formSchemas";

type FormValues = z.infer<typeof emiFormSchema>;

export default function EMICalculatorForm() {
  const [emiResult, setEmiResult] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(emiFormSchema),
    defaultValues: {
      loanAmount: 100000,
      interestRate: 10,
      loanTenure: 3,
    },
  });

  const calculateEMI = (amount: number, rate: number, tenure: number) => {
    // Convert interest rate from percentage to decimal and then to monthly
    const monthlyRate = rate / 12 / 100;

    // Convert tenure from years to months
    const tenureInMonths = tenure * 12;

    // Calculate EMI using formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
      (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

    return emi;
  };

  const onSubmit = (data: FormValues) => {
    const emi = calculateEMI(
      data.loanAmount,
      data.interestRate,
      data.loanTenure
    );
    setEmiResult(emi);

    // Calculate total amount and interest
    const totalPayment = emi * data.loanTenure * 12;
    setTotalAmount(totalPayment);
    setTotalInterest(totalPayment - data.loanAmount);
  };

  // Recalculate EMI whenever form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.loanAmount && value.interestRate && value.loanTenure) {
        const amount =
          typeof value.loanAmount === "number"
            ? value.loanAmount
            : Number.parseFloat(value.loanAmount as unknown as string);
        const rate =
          typeof value.interestRate === "number"
            ? value.interestRate
            : Number.parseFloat(value.interestRate as unknown as string);
        const tenure =
          typeof value.loanTenure === "number"
            ? value.loanTenure
            : Number.parseInt(value.loanTenure as unknown as string, 10);

        if (amount > 0 && rate > 0 && tenure > 0) {
          const emi = calculateEMI(amount, rate, tenure);
          setEmiResult(emi);

          const totalPayment = emi * tenure * 12;
          setTotalAmount(totalPayment);
          setTotalInterest(totalPayment - amount);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormWrapper
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installment (EMI) for vehicle loans"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount (₹)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? "0" : e.target.value;
                        field.onChange(Number.parseFloat(value));
                      }}
                    />
                    <Slider
                      value={[field.value]}
                      min={10000}
                      max={5000000}
                      step={10000}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹10,000</span>
                      <span>₹50,00,000</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? "0" : e.target.value;
                        field.onChange(Number.parseFloat(value));
                      }}
                    />
                    <Slider
                      value={[field.value]}
                      min={1}
                      max={30}
                      step={0.1}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanTenure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Tenure (Years)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? "0" : e.target.value;
                        field.onChange(Number.parseInt(value, 10));
                      }}
                    />
                    <Slider
                      value={[field.value]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>10 years</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate EMI
          </Button>

          {emiResult !== null && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 text-center p-4 bg-primary/10 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Monthly EMI
                    </h3>
                    <p className="text-2xl font-bold">
                      ₹{emiResult.toFixed(2)}
                    </p>
                  </div>

                  <div className="space-y-2 text-center p-4 bg-primary/10 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total Interest
                    </h3>
                    <p className="text-2xl font-bold">
                      ₹{totalInterest?.toFixed(2)}
                    </p>
                  </div>

                  <div className="space-y-2 text-center p-4 bg-primary/10 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total Amount
                    </h3>
                    <p className="text-2xl font-bold">
                      ₹{totalAmount?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </FormWrapper>
  );
}

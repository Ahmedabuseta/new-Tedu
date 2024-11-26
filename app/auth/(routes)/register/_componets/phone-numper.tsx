"use client";
import React from "react";
import {useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  // Add more country codes as needed
];

const PhoneNumberComponent = () => {
  const { control } = useFormContext();
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  return (
    <div>
      <div className="flex space-x-4 m-0">
        <FormField
          control={control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="flex-shrink-0 w-24">
              {/* <FormLabel>Code</FormLabel> */}
              <Select onValueChange={field.onChange} disabled={isSubmitting} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex-grow">
              {/* <FormLabel>Phone Number</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const formatted = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    field.onChange(formatted);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="text-sm text-gray-500 my-2">
        Please enter a 10-digit phone number without spaces or dashes.
      </div>
    </div>
  );
};

export default PhoneNumberComponent;

"use client";

import React, { useContext, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Check, Eye, EyeOff, X } from "lucide-react";

const PasswordStrengthComponent = () => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  const { watch } = useFormContext();
  const password = watch("password");

  const getStrength = (pass: string) => {
    const checks = [
      pass.length >= 8,
      /[a-z]/.test(pass),
      /[A-Z]/.test(pass),
      /[0-9]/.test(pass),
      /[^a-zA-Z0-9]/.test(pass),
    ];
    return checks.filter(Boolean).length;
  };

  const strength = getStrength(password);

  const RequirementItem = ({
    met = false,
    text,
  }: {
    met?: boolean;
    text: string;
  }) => (
    <div className="flex items-center space-x-2">
      {met ? (
        <Check className="text-green-500" size={16} />
      ) : (
        <X className="text-red-500" size={16} />
      )}
      <span className={`text-sm ${met ? "text-green-700" : "text-red-700"}`}>
        {text}
      </span>
    </div>
  );

  const StrengthBar = ({ strength }: { strength: number }) => {
    const bars = [
      { color: "bg-red-500", label: "Weak" },
      { color: "bg-orange-500", label: "Fair" },
      { color: "bg-yellow-500", label: "Good" },
      { color: "bg-green-500", label: "Strong" },
      { color: "bg-blue-500", label: "Very Strong" },
    ];

    return (
      <div className="space-y-2">
        <div className="flex space-x-1">
          {bars.map((bar, index) => (
            <div key={index} className="flex-1">
              <div
                className={`h-1 rounded-full ${
                  index < strength ? bar.color : "bg-gray-200"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="text-sm font-medium text-gray-700">
          {bars[Math.min(strength, 4)].label}
        </div>
      </div>
    );
  };
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimedPassword, setShowConfrimedPassword] = useState(false);
  return (
    <div className="flex justify-between w-full items-start gap-3">
      <div className="flex relative w-full flex-col justify-center gap-2">
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  disabled={isSubmitting}
                  placeholder="Enter a strong password"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                
              </FormControl>
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-0"
                >
                  {showPassword ? <Eye className="w-5 h-5 text-muted-foreground" /> : <EyeOff className="w-5 h-5 text-muted-foreground" />}
                </button>
              {isFocused && (
                <div className="absolute z-10 w-80 mt-2 bg-white shadow-lg p-4 rounded-lg">
                  <div className="space-y-2">
                  <StrengthBar strength={strength} />
                    <h4 className="font-semibold text-sm">
                      Password Requirements:
                    </h4>
                    <RequirementItem
                      met={password.length >= 8}
                      text="At least 8 characters long"
                    />
                    <RequirementItem
                      met={/[a-z]/.test(password)}
                      text="Contains lowercase letter"
                    />
                    <RequirementItem
                      met={/[A-Z]/.test(password)}
                      text="Contains uppercase letter"
                    />
                    <RequirementItem
                      met={/[0-9]/.test(password)}
                      text="Contains number"
                    />
                    <RequirementItem
                      met={/[^a-zA-Z0-9]/.test(password)}
                      text="Contains special character"
                    />
                  </div>
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="relative w-full">
      <FormField
        control={control}
        
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                type={showConfrimedPassword ? "text" : "password"}
                placeholder="Confirm your password"
                disabled={isSubmitting}
              />
            </FormControl>
            <button
                  type="button"
                  onClick={() => setShowConfrimedPassword(!showConfrimedPassword)}
                  className="absolute right-2 top-0"
                >
                  {showConfrimedPassword ? <Eye className="w-5 h-5 text-muted-foreground "/> : <EyeOff className="w-5 h-5 text-muted-foreground" />}
                </button>
            <FormMessage />
            
          </FormItem>
        )}
      /></div>
    </div>
  );
};

export default PasswordStrengthComponent;

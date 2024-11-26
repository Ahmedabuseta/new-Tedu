"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { formatPrice } from "@/lib/format";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/paymob`);
      window.location.assign(
        `https://accept.paymobsolutions.com/api/acceptance/iframes/846106?payment_token=${response.data.token}`
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const enrollWithVoda = async () => {
    try {
      setIsLoading(true);
      const {
        data: { token },
      } = await axios.post(`/api/courses/${courseId}/paymob`);
      const {
        data: { redirection_url, pending, success },
      } = await axios.post(
        `https://accept.paymob.com/api/acceptance/payments/pay`,
        {
          source: {
            identifier: "wallet mobile number",
            subtype: "WALLET",
          },
          payment_token: token, // token obtained in step 3
        }
      ); 
      // if (pending && !success) {
      //   toast.error("error with payment please try again");
      // }
      window.location.assign(redirection_url);
     
      
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:w-[300px] w-full p-6 rounded-xl bg-sky-200/30 z-50 backdrop-blur-md ">
      <Button
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto bg-blue-400/40"
      >
        <CreditCard className="mx-3" />
        Enroll for {formatPrice(price)}
      </Button>
      <Button
        onClick={enrollWithVoda}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto  bg-blue-400/40"
      >
        <Image src="/voda.png" alt="vodafone img" width={20} height={20} className="mx-3"/>
        Enroll for {formatPrice(price)}
      </Button>
    </div>
  );
};

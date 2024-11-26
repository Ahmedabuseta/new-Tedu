// app/api/accept-callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { log } from "console";

const HMAC_SECRET = process.env.ACCEPT_HMAC_SECRET as string;

interface AcceptCallbackData {
  id: string;
  amount_cents: number;
  created_at: string;
  currency: string;
  error_occured: boolean;
  has_parent_transaction: boolean;
  integration_id: number;
  is_3d_secure: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_refunded: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  order: {
    id: string;
  };
  owner: number;
  pending: boolean;
  source_data: {
    pan: string;
    sub_type: string;
    type: string;
  };
  success: boolean;
}

const sortObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {} as Record<string, any>);
};

const calculateHMAC = (data: AcceptCallbackData): string => {
  const hmacKeys: (keyof AcceptCallbackData | string)[] = [
    "amount_cents",
    "created_at",
    "currency",
    "error_occured",
    "has_parent_transaction",
    "id",
    "integration_id",
    "is_3d_secure",
    "is_auth",
    "is_capture",
    "is_refunded",
    "is_standalone_payment",
    "is_voided",
    "order.id",
    "owner",
    "pending",
    "source_data.pan",
    "source_data.sub_type",
    "source_data.type",
    "success",
  ];

  const hmacString = hmacKeys
    .map((key) => {
      if (key.includes(".")) {
        const [parentKey, childKey] = key.split(".") as [
          keyof AcceptCallbackData,
          string
        ];
        return data[parentKey]
          ? (data[parentKey] as any)[childKey]?.toString() ?? ""
          : "";
      }
      return data[key as keyof AcceptCallbackData]?.toString() ?? "";
    })
    .join("");

  return crypto
    .createHmac("sha512", HMAC_SECRET)
    .update(hmacString)
    .digest("hex");
};

export async function POST(request: Request) {
  // const query = request.text
  console.log(request)
  try {
    const callbackData = sortObject(await request.json()) as AcceptCallbackData;
    const receivedHmac = new URL(request.url).searchParams.get("hmac");

    if (!receivedHmac) {
      return NextResponse.json({ message: "Missing HMAC" }, { status: 400 });
    }

    const calculatedHmac = calculateHMAC(callbackData);

    if (receivedHmac !== calculatedHmac) {
      return NextResponse.json({ message: "Invalid HMAC" }, { status: 400 });
    }
    console.log(callbackData);

    // Process the transaction data
    const {
      id,
      success,
      amount_cents,
      currency,
      error_occured,
      is_refunded,
      is_voided,
      order,
    } = callbackData;

    // TODO: Update your database with the transaction status

    console.log(
      `Transaction ${id} processed. Status: ${success ? "Success" : "Failed"}`
    );

    // Respond to Accept
    return NextResponse.json({ status: "Received" }, { status: 200 });
  } catch (err) {
    console.log("errororr");
    return new NextResponse("CALLBACK_ERROR");
  }
}

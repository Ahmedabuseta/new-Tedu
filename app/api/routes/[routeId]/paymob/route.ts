import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
// import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { routeId: string } }
) {
  try {
    const user= await currentUser();
    const userId =user?.userId

    if (!user || !userId || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const route = await db.route.findUnique({
      where: {
        id: params.routeId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_routeId: {
          userId: userId,
          routeId: params.routeId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!route) {
      return new NextResponse("Not found", { status: 404 });
    }

    const authToken = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      {
        api_key: `${process.env.PAYMOB_API_KEY}`,
      }
    );
    const orderId = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: authToken.data.token,
        delivery_needed: "false",
        amount_cents: "500",
        currency: "EGP",
        items: [],
      }
    );
    const token = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: authToken.data.token,
        amount_cents: "500",
        expiration: 3600,
        order_id: orderId.data.id.toString(),
        billing_data: {
          apartment: "803",
          email: "claudette09@exa.com",
          floor: "NA",
          first_name: "Clifford",
          street: "NA",
          building: "NA",
          phone_number: "+86(8)9135210487",
          shipping_method: "NA",
          postal_code: "NA",
          city: "NA",
          country: "EG",
          last_name: "NA",
          state: "NA",
        },
        currency: "EGP",
        integration_id: 4574860,
      }
    );

    return NextResponse.json({ token: token.data.token});

  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

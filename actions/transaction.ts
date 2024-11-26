import { db } from "@/lib/db";

export async function newTransaction(walletId: string) {
  await db.transaction.create({
    data: {
      walletId: walletId,
      amount: 100.0,
      status: "PENDING",
      description: "Referral commission",
    },
  });

  // Update wallet balance after transaction is completed
  await db.wallet.update({
    where: { id: walletId },
    data: {
      currentBalance: {
        increment: 100.0, // increase the balance
      },
      totalEarnings: {
        increment: 100.0, // increase the total earnings
      },
    },
  });
}

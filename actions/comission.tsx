import { db } from "@/lib/db";

export async function setCommissionRate(newRate: number) {
  try {
    let rate = Number(newRate);
    if (isNaN(rate)) {
      throw new Error("The commission rate must be a number.");
    }

    // Convert to integer
    rate = Math.floor(rate);

    await db.commission.create({
      data: {
        rate: rate,
        startDate: new Date(),
      },
    });
    return { messgae: `New commission rate set to ${rate}%` };
  } catch (err) {
    return {  err, msg:'INTERNAL_SERVER_ERROR-500' };
  }
}

export async function getCurrentCommissionRate() {
  try {
    const now = new Date();
    const commission = await db.commission.findFirst({
      where: {
        startDate: { lte: now },
        OR: [{ endDate: { gte: now } }, { endDate: null }],
      },
      orderBy: { startDate: "desc" },
    });

    return commission ? Math.floor(commission.rate) : 0;
  } catch (err) {
    return {  err ,msg:'INTERNAL_SERVER_ERROR-500' };
  }
}

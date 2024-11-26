import { BadgeDollarSignIcon, Banknote, Users } from "lucide-react";
import WalletCard from "./_components/wallet-card";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WalletChart } from "./_components/chart";
import TRansactionTable from "./_components/transaction-sec";

export default async function Wallet() {
  const user = await currentUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/auth/login");
  }

  const walletCards = [
    {
      icon: BadgeDollarSignIcon,
      label: "Total Earnings",
      data: "555 $",
      variant: "default", // Change 'orange' to one of the expected variant strings, e.g., 'default', 'success', 'indigo', or leave it as null/undefined if 'orange' is not valid.
    },
    {
      icon: Banknote,
      label: "Current Balance",
      data: "555 $",
      variant: "default",
    },
    {
      icon: Users,
      label: "User Invited",
      data: "555 $",
      variant: "default",
    },
  ];
  return (
    <div className="w-full h-full p-6">
      <h1>Wallet</h1>
      <div className="w-full flex gap-6 items-center justify-center flex-wrap">
        {walletCards.map((card) => (
          <WalletCard
            key={card.data}
            icon={card.icon}
            label={card.label}
            data={card.data}
            variant="orange"
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-stretch gap-6 flex-1 xl:flex-nowrap flex-wrap my-12">
        <WalletChart />
        <TRansactionTable />
      </div>
    </div>
  );
}

// Removed the incorrect export statement

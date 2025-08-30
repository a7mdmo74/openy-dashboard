import { BalanceHistory } from "@/components/PagesComponent/dashboard/BalanceHistory";
import CreditCard from "@/components/PagesComponent/dashboard/CreditCard";
import ExpenseStatisticsChart from "@/components/PagesComponent/dashboard/ExpenseStatisticsChart";
import QuickTransfer from "@/components/PagesComponent/dashboard/QuickTransfer";
import TransactionCard from "@/components/PagesComponent/dashboard/TransactionCard";
import WeeklyActivityChart from "@/components/PagesComponent/dashboard/WeeklyActivityChart";
import Link from "next/link";

export default function DashboardPage() {
  const cards = [
    {
      id: 1,
      balance: "$5,756",
      cardHolder: "Eddy Cusuma",
      validThru: "12/22",
      cardNumber: "3778",
    },
    {
      id: 2,
      balance: "$12,450",
      cardHolder: "Sarah Johnson",
      validThru: "08/25",
      cardNumber: "4521",
    },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex px-4 flex-1 flex-col gap-2 py-4 md:px-10">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#343C6A]">My Cards</h2>
              <Link href="/" className="text-[#343C6A] text-sm">
                See more
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cards.map((card) => (
                <CreditCard
                  key={card.id}
                  id={card.id}
                  balance={card.balance}
                  cardHolder={card.cardHolder}
                  validThru={card.validThru}
                  cardNumber={card.cardNumber}
                  className={
                    card.id % 2 === 0
                      ? "!bg-white text-black"
                      : "bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 text-white"
                  }
                />
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-[#343C6A] mb-4">
              Add New Card
            </h2>
            <TransactionCard />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-8">
          <div className="col-span-2">
            <WeeklyActivityChart />
          </div>
          <div className="col-span-1">
            <ExpenseStatisticsChart />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-8">
          <div className="col-span-1">
            <QuickTransfer />
          </div>
          <div className="col-span-2">
            <BalanceHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

const TransactionCard = () => {
  const transactions = [
    {
      id: 1,
      title: "Deposit from my Card",
      date: "28 January 2021",
      amount: -850,
      icon: "💳",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 2,
      title: "Deposit Paypal",
      date: "25 January 2021",
      amount: 2500,
      icon: "🅿️",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Jemi Wilson",
      date: "21 January 2021",
      amount: 5400,
      icon: "👤",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const formatAmount = (amount: number) => {
    const sign = amount > 0 ? "+" : "";
    return `${sign}$${Math.abs(amount).toLocaleString()}`;
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 w-full max-w-sm">
      <h3 className="text-xl font-semibold text-gray-800">
        Recent Transaction
      </h3>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 ${transaction.bgColor} rounded-full flex items-center justify-center`}
              >
                <span className="text-xl">{transaction.icon}</span>
              </div>
              <div>
                <h4 className="text-gray-800 font-medium text-sm">
                  {transaction.title}
                </h4>
                <p className="text-gray-500 text-xs">{transaction.date}</p>
              </div>
            </div>

            <div
              className={`font-semibold text-sm ${getAmountColor(
                transaction.amount
              )}`}
            >
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionCard;

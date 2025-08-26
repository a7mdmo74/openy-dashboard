// No imports needed for this basic version

import Image from "next/image";

interface CreditCardProps {
  balance?: string;
  id?: number;
  cardHolder?: string;
  validThru?: string;
  cardNumber?: string;
  className?: string;
}

const CreditCard = ({
  balance = "$5,756",
  id = 1,
  cardHolder = "Eddy Cusuma",
  validThru = "12/22",
  cardNumber = "3778",
  className = "",
}: CreditCardProps) => {
  const maskedNumber = `${cardNumber} •••• •••• 1234`;

  return (
    <div
      className={`
        relative w-full max-w-md h-[235px] p-6 rounded-2xl
        shadow-2xl
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-sm"></div>
        <div className="absolute bottom-8 left-4 w-12 h-12 rounded-full bg-white/5"></div>
        <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-white/5 transform translate-x-16"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Top Section - Balance */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-1">Balance</p>
          <h2 className="text-2xl font-bold tracking-tight">{balance}</h2>
        </div>

        {/* Chip */}
        <div className="absolute top-4 right-4">
          {id % 2 === 0 ? (
            <Image src="/chip-black.svg" alt="Chip" width={40} height={30} />
          ) : (
            <Image src="/chip.png" alt="Chip" width={40} height={30} />
          )}
        </div>

        {/* Card Number */}
        <div className="mb-6">
          <div className="font-mono text-lg font-semibold tracking-widest">
            {maskedNumber}
          </div>
        </div>

        {/* Bottom Section - Card Info */}
        <div className="flex justify-between items-end">
          <div className="flex space-x-8">
            <div>
              <p className="text-xs font-medium mb-1 uppercase tracking-wide">
                Card Holder
              </p>
              <p className="text-sm font-semibold">{cardHolder}</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1 uppercase tracking-wide">
                Valid Thru
              </p>
              <p className="text-sm font-semibold">{validThru}</p>
            </div>
          </div>

          {/* Card Network Logo */}
          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full opacity-80"></div>
            </div>
            <div className="w-8 h-8 bg-white/70 rounded-full flex items-center justify-center -ml-2">
              <div className="w-6 h-6 bg-orange-400 rounded-full opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

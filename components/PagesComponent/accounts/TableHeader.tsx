"use client";

import { FunnelIcon, PlusIcon } from "lucide-react";

export default function TableHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
      <div className="flex items-center gap-3">
        <button className="p-2 border rounded-md bg-white hover:bg-gray-100">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 w-32 md:w-64 lg:w-96 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        <PlusIcon className="h-5 w-5" />
        Add customer
      </button>
    </div>
  );
}

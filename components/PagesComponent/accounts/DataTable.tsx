"use client";

import Pagination from "@/components/PagesComponent/accounts/Pagination";
import TableHeader from "@/components/PagesComponent/accounts/TableHeader";
import { Product, ProductsResponse } from "@/lib/typing";
import React, { useState } from "react";
import { fetchData } from "@/actions/productsActions";

interface DataTableProps {
  data: ProductsResponse;
}

function DataTable({ data: initialData }: DataTableProps) {
  const [data, setData] = useState<ProductsResponse>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Total pages from API response
  const totalPages = Math.ceil(data.total / data.limit);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data?.products.map((item) => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleInputChange = (
    id: number,
    field: keyof Product,
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (status) {
      case "In Stock":
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      case "Low Stock":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case "Out of Stock":
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  // Handle page change
  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const newData = await fetchData(page, data.limit);
    setData(newData);
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <TableHeader />
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.products.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.products.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 ${
                  index % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(item.id, "title", e.target.value)
                    }
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded px-2 py-1"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded border">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(
                        item.id,
                        "price",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded px-2 py-1 text-right"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) =>
                      handleInputChange(
                        item.id,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded px-2 py-1 text-right"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className={getStatusBadge(item.availabilityStatus)}>
                    {item.availabilityStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dynamic pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default DataTable;

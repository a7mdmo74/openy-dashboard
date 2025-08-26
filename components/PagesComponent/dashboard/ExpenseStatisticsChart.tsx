"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function ExpenseStatisticsChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const expenseData = [
        { name: "Entertainment", value: 30, color: "#475569" },
        { name: "Bill Expense", value: 15, color: "#F97316" },
        { name: "Investment", value: 20, color: "#E879F9" },
        { name: "Others", value: 35, color: "#3B82F6" },
      ];

      const option = {
        series: [
          {
            type: "pie",
            radius: ["0%", "80%"],
            center: ["50%", "50%"],
            data: expenseData.map((item) => ({
              value: item.value,
              name: item.name,
              itemStyle: {
                color: item.color,
                borderWidth: 3,
                borderColor: "#ffffff",
              },
              label: {
                show: true,
                position: "inside",

                fontSize: 14,
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 18,
              },
              labelLine: {
                show: false,
              },
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              scale: true,
              scaleSize: 5,
            },
            animationType: "scale",
            animationEasing: "elasticOut",
          },
        ],
        tooltip: {
          trigger: "item",
          backgroundColor: "white",
          borderColor: "#E5E7EB",
          borderWidth: 1,
          borderRadius: 8,
          textStyle: {
            color: "#374151",
            fontSize: 12,
          },
        },
      };

      chart.setOption(option);

      // Handle window resize
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, []);

  const expenseData = [
    { name: "Entertainment", value: 30, color: "#475569" },
    { name: "Bill Expense", value: 15, color: "#F97316" },
    { name: "Investment", value: 20, color: "#E879F9" },
    { name: "Others", value: 35, color: "#3B82F6" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#343C6A] mb-4">
        Expense Statistics
      </h3>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full h-full max-w-sm">
        <div
          ref={chartRef}
          style={{ width: "100%", height: "260px" }}
          className="min-h-[260px]"
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-gray-600 font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

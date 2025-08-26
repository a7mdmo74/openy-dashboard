"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function WeeklyActivityChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const weeklyData = [
        { day: "Sat", withdraw: 480, deposit: 240 },
        { day: "Sun", withdraw: 350, deposit: 120 },
        { day: "Mon", withdraw: 320, deposit: 260 },
        { day: "Tue", withdraw: 480, deposit: 360 },
        { day: "Wed", withdraw: 150, deposit: 240 },
        { day: "Thu", withdraw: 380, deposit: 240 },
        { day: "Fri", withdraw: 400, deposit: 340 },
      ];

      const option = {
        grid: {
          left: "8%",
          right: "4%",
          bottom: "15%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: weeklyData.map((item) => item.day),
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#9CA3AF",
            fontSize: 12,
            fontWeight: 500,
          },
        },
        yAxis: {
          type: "value",
          max: 500,
          interval: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#9CA3AF",
            fontSize: 11,
          },
          splitLine: {
            lineStyle: {
              color: "#F3F4F6",
              width: 1,
            },
          },
        },
        series: [
          {
            name: "Withdraw",
            type: "bar",
            data: weeklyData.map((item) => item.withdraw),
            itemStyle: {
              color: "#3B82F6",
              borderRadius: [20, 20, 20, 20],
            },
            barWidth: 16,
            barGap: "10%",
          },
          {
            name: "Deposit",
            type: "bar",
            data: weeklyData.map((item) => item.deposit),
            itemStyle: {
              color: "#2DD4BF",
              borderRadius: [20, 20, 20, 20],
            },
            barWidth: 16,
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
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

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#343C6A] mb-4">
        Weekly Activity
      </h3>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full h-full">
        <div className="flex justify-between items-center mb-6">
          {/* Legend */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Deposit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Withdraw</span>
            </div>
          </div>
        </div>

        {/* ECharts container */}
        <div
          ref={chartRef}
          style={{ width: "100%", height: "280px" }}
          className="min-h-[280px]"
        />
      </div>
    </div>
  );
}

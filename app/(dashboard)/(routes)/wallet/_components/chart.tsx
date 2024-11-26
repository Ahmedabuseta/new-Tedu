"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", invites: 186, activeInvites: 80, comission: 125 },
  { month: "February", invites: 305, activeInvites: 200, comission: 115 },
  { month: "March", invites: 237, activeInvites: 120, comission: 25 },
  { month: "April", invites: 73, activeInvites: 190, comission: 225 },
  { month: "May", invites: 209, activeInvites: 130, comission: 325 },
  { month: "June", invites: 214, activeInvites: 140, comission: 205 },
]

const chartConfig = {
  invites: {
    label: "invites",
    color: "#2563eb",
  },
  activeInvites: {
    label: "activeInvites",
    color: "#60a5fa",
  },
  comission: {
    label: "comission",
    color: "#38ac7b    ",
  },
} satisfies ChartConfig

export function WalletChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full bg-opacity-40 bg-white dark:bg-black/40 backdrop-blur-md p-6 rounded-xl "
    >
      {/* <AreaChart data={chartData}>
      <defs>
    <linearGradient id="colorinvites" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorinactiveInvites" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorcomission" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="75%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area type="monotone" dataKey="invites" stroke="#82ca9d" fillOpacity={1} fill="url(#colorinvites)" />
        <Area type="monotone" dataKey="activeInvites" stroke="#8884d8" fillOpacity={1} fill="url(#colorinactiveInvites)" />
        <Area type="monotone" dataKey="comission" stroke="#21f654" fillOpacity={1} fill="url(#colorcomission)" />

        
      </AreaChart> */}
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="invites" fill="var(--color-invites)" radius={4} />
        <Bar dataKey="activeInvites" fill="var(--color-activeInvites)" radius={4} />
        <Bar dataKey="comission" fill="var(--color-comission)" radius={4} />

      </BarChart>
    </ChartContainer>
  )
}

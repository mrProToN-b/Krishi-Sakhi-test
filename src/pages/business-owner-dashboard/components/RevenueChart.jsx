import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 45000, orders: 28, profit: 12000 },
    { month: 'Feb', revenue: 52000, orders: 35, profit: 15000 },
    { month: 'Mar', revenue: 48000, orders: 32, profit: 13500 },
    { month: 'Apr', revenue: 61000, orders: 42, profit: 18000 },
    { month: 'May', revenue: 58000, orders: 38, profit: 16500 },
    { month: 'Jun', revenue: 67000, orders: 45, profit: 20000 },
    { month: 'Jul', revenue: 72000, orders: 48, profit: 22000 },
    { month: 'Aug', revenue: 69000, orders: 46, profit: 21000 },
    { month: 'Sep', revenue: 75000, orders: 52, profit: 24000 },
    { month: 'Oct', revenue: 78000, orders: 55, profit: 25500 },
    { month: 'Nov', revenue: 82000, orders: 58, profit: 27000 },
    { month: 'Dec', revenue: 85000, orders: 62, profit: 28500 }
  ];

  const [chartType, setChartType] = React.useState('revenue');
  const [viewType, setViewType] = React.useState('bar');

  const formatCurrency = (value) => {
    return `₹${(value / 1000)?.toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.name === 'orders' ? entry?.value : formatCurrency(entry?.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const dataKey = chartType;
    const color = chartType === 'revenue' ? '#2D5016' : chartType === 'profit' ? '#059669' : '#F4A261';

    if (viewType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={chartType === 'orders' ? undefined : formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={chartType === 'orders' ? undefined : formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={dataKey} 
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Business Analytics</h3>
              <p className="text-sm text-muted-foreground">Monthly performance overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewType === 'bar' ? 'default' : 'outline'} 
              size="xs"
              iconName="BarChart3"
              onClick={() => setViewType('bar')}
            />
            <Button 
              variant={viewType === 'line' ? 'default' : 'outline'} 
              size="xs"
              iconName="TrendingUp"
              onClick={() => setViewType('line')}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Chart Type Selector */}
        <div className="flex items-center space-x-2 mb-6">
          <Button
            variant={chartType === 'revenue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('revenue')}
          >
            Revenue
          </Button>
          <Button
            variant={chartType === 'profit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('profit')}
          >
            Profit
          </Button>
          <Button
            variant={chartType === 'orders' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('orders')}
          >
            Orders
          </Button>
        </div>

        {/* Chart */}
        <div className="w-full">
          {renderChart()}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">₹8.5L</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">₹2.4L</p>
            <p className="text-sm text-muted-foreground">Total Profit</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">521</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import StatCard from './StatCard';
import { Student, Fee } from '../types';

interface DashboardProps {
  students: Student[];
  fees: Fee[];
}

const Dashboard: React.FC<DashboardProps> = ({ students, fees }) => {
  const totalFees = fees.reduce((acc, f) => acc + f.amount, 0);
  
  const classDistribution = students.reduce((acc: any[], s) => {
    const existing = acc.find(item => item.name === s.class_code);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: s.class_code, value: 1 });
    }
    return acc;
  }, []);

  const feeByMode = fees.reduce((acc: any[], f) => {
    const existing = acc.find(item => item.name === f.payment_mode);
    if (existing) {
      existing.amount += f.amount;
    } else {
      acc.push({ name: f.payment_mode, amount: f.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">System Overview</h2>
        <p className="text-slate-500">Real-time stats for the academic session 2024-25</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Students" 
          value={students.length} 
          icon="fa-users" 
          color="bg-blue-50 text-blue-600" 
          trend="12%" 
          trendUp={true} 
        />
        <StatCard 
          label="Total Collection" 
          value={`₹${totalFees.toLocaleString()}`} 
          icon="fa-indian-rupee-sign" 
          color="bg-green-50 text-green-600" 
          trend="8%" 
          trendUp={true} 
        />
        <StatCard 
          label="Avg. Fee / Student" 
          value={`₹${students.length ? Math.round(totalFees / students.length).toLocaleString() : 0}`} 
          icon="fa-calculator" 
          color="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          label="Active Sessions" 
          value="1" 
          icon="fa-calendar-check" 
          color="bg-orange-50 text-orange-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Student Distribution by Class</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue by Payment Mode</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeByMode}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {feeByMode.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {feeByMode.map((mode, index) => (
              <div key={mode.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-xs text-slate-600 font-medium">{mode.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { Fee, Student } from '../types';

interface FeesListProps {
  fees: Fee[];
  students: Student[];
}

const FeesList: React.FC<FeesListProps> = ({ fees, students }) => {
  const getStudentName = (id: number) => {
    return students.find(s => s.id === id)?.name || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fee Transactions</h2>
          <p className="text-slate-500">Track and manage student fee payments</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2 w-fit">
          <i className="fa-solid fa-plus"></i>
          Collect Fee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Receipt #</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm font-bold text-blue-600">{fee.receipt_no}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {getStudentName(fee.studentId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(fee.payment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">₹{fee.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">
                      {fee.payment_mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                      <i className="fa-solid fa-print"></i>
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesList;

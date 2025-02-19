import React, { useState } from 'react';
import { 
  HiOutlineDocumentAdd,
  HiOutlineDownload,
  HiOutlineUpload,
  HiOutlineCurrencyDollar,
  HiOutlineChartPie,
  HiOutlineChartBar
} from 'react-icons/hi';

// You'll need to install recharts
// npm install recharts
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Budget = () => {
  const [activeYear, setActiveYear] = useState('2024');
  const [activeQuarter, setActiveQuarter] = useState('Q1');

  const budgetData = [
    { category: 'Infrastructure', allocated: 1200000, spent: 800000 },
    { category: 'Education', allocated: 900000, spent: 750000 },
    { category: 'Healthcare', allocated: 1500000, spent: 1200000 },
    { category: 'Technology', allocated: 600000, spent: 400000 },
    { category: 'Social Services', allocated: 800000, spent: 600000 },
  ];

  const years = ['2024', '2023', '2022'];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Budget Management</h1>
        <div className="mt-3 sm:mt-0 space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            <HiOutlineDocumentAdd className="mr-2 h-5 w-5" />
            New Budget Entry
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <HiOutlineDownload className="mr-2 h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="sm:flex sm:items-center sm:space-x-4">
          <div className="flex space-x-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeYear === year
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            {quarters.map((quarter) => (
              <button
                key={quarter}
                onClick={() => setActiveQuarter(quarter)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeQuarter === quarter
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {quarter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineCurrencyDollar className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Total Budget</div>
                <div className="text-2xl font-semibold text-gray-900">$5,000,000</div>
                <div className="text-sm text-green-600">+12% from last year</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineChartBar className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Spent</div>
                <div className="text-2xl font-semibold text-gray-900">$3,750,000</div>
                <div className="text-sm text-gray-600">75% of total budget</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add more overview cards as needed */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Budget Allocation Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Allocation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetData}
                  dataKey="allocated"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#4F46E5"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget vs Spent Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget vs Spent</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="allocated" fill="#4F46E5" name="Allocated" />
                <Bar dataKey="spent" fill="#10B981" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Budget Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Detailed Budget Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocated Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.allocated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.spent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(item.allocated - item.spent).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      (item.spent / item.allocated) > 0.9
                        ? 'bg-red-100 text-red-800'
                        : (item.spent / item.allocated) > 0.7
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {Math.round((item.spent / item.allocated) * 100)}% Used
                    </span>
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

export default Budget;
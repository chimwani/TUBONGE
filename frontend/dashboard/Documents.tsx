import React, { useState } from 'react';
import { 
  HiOutlineDocumentAdd,
  HiOutlineDownload,
  HiOutlineSearch,
  HiOutlineTag,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineFilter,
  HiOutlineUpload
} from 'react-icons/hi';

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'bills', name: 'Bills' },
    { id: 'policies', name: 'Policies' },
    { id: 'regulations', name: 'Regulations' },
    { id: 'reports', name: 'Reports' }
  ];

  const documents = [
    {
      id: 1,
      title: "Environmental Protection Act 2024",
      category: "bills",
      status: "draft",
      dateUploaded: "2024-03-01",
      lastModified: "2024-03-10",
      author: "Department of Environment",
      size: "2.4 MB",
      tags: ["environment", "legislation"]
    },
    // Add more document data here
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Legislative Documents</h1>
        <div className="mt-3 sm:mt-0 space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            <HiOutlineDocumentAdd className="mr-2 h-5 w-5" />
            New Document
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <HiOutlineUpload className="mr-2 h-5 w-5" />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="max-w-lg">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search documents..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              {/* Document Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {doc.author}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  doc.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  doc.status === 'published' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {doc.status}
                </span>
              </div>

              {/* Document Meta */}
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <HiOutlineTag className="flex-shrink-0 mr-1.5 h-5 w-5" />
                <span>{doc.category}</span>
                <span className="mx-2">•</span>
                <span>{doc.size}</span>
              </div>

              {/* Document Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {doc.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Last modified: {new Date(doc.lastModified).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600">
                    <HiOutlineEye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <HiOutlinePencil className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <HiOutlineTrash className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600">
                    <HiOutlineDownload className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> documents
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {/* Add pagination buttons here */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
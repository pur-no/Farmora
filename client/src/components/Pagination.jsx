// client/src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ pages, page, onPageChange }) => {
  if (pages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="flex justify-center items-center -space-x-px h-10 text-base">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <button
              onClick={() => onPageChange(x + 1)}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${
                x + 1 === page
                  ? 'text-blue-600 bg-blue-50 font-bold'
                  : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {x + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
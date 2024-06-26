import React from 'react'
import './Pagination.css'
const Pagination = ({ flagsPerPage, totalFlags, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalFlags / flagsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    return (
      <nav >
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#"
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
export default Pagination;
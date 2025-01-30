import React, { useState, useEffect } from 'react';
import { UserI } from '../types/types';
import Link from 'next/link';

export default function DataTable ({ data, pageSize = 10 }: {data:UserI[], pageSize:number}) {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [nbOfPages, setNbOfPages] = useState(Math.round(data.length / pageSize));
  
  // Handle the search input change
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
    }

  // Filter data based on search query
  useEffect(() => {
    const filtered = data.filter((item) =>
        notEmpty(item.lastName) && item.lastName.startsWith(searchQuery)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search change
    setNbOfPages(Math.round(filtered.length / pageSize));
  }, [searchQuery, data]);

  // Paginate the filtered data
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextChange = () => {
    setCurrentPage(a => a + 1);
  };

  const handlePreviousChange = () => {
    setCurrentPage(a => a - 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Début du nom..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul className="nav justify-content-end">
            <li><p>&nbsp;&nbsp;Page : <b>{currentPage}</b> sur <b>{nbOfPages}</b>&nbsp;</p></li>
            <li><button className="btn btn-primary" onClick={() => handlePageChange(1)}>First</button>&nbsp;</li>
            <li><button className="btn btn-primary" onClick={() => handleNextChange()}>Next</button>&nbsp;</li>
            <li><button className="btn btn-primary" onClick={() => handlePreviousChange()}>Previous</button>&nbsp;</li>
            <li><button className="btn btn-primary" onClick={() => handlePageChange(nbOfPages)}>Last</button>&nbsp;</li>
    </ul>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Prénom</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td><Link href={`/net2/users/${item.id}`}>{item.id}</Link></td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
  )
}

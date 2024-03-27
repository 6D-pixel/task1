import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import PopUp from "./PopUp";
import "./FlagList.css";

export const FlagList = () => {
  const [flags, setFlags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFlags, setFilteredFlags] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const flagsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`, {
          params: {
            limit: flagsPerPage,
            offset: (currentPage - 1) * flagsPerPage,
          },
        });
        setFlags(response.data);
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };

    fetchData();
  }, [currentPage]);
  useEffect(() => {
    const filtered = flags.filter((flag) =>
      flag.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFlags(filtered);
  }, [flags, searchTerm]);

  const indexOfLastFlag = currentPage * flagsPerPage;
  const indexOfFirstFlag = indexOfLastFlag - flagsPerPage;
  const currentFlags = filteredFlags.slice(indexOfFirstFlag, indexOfLastFlag);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const openModal = (country) => {
    setSelectedCountry(country);
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };
  return (
    <section>
      <div  className={selectedCountry ? "blur-background" : ""}>
        <h2>Country Flags</h2>
        <input
          style={{ width: "300px", marginBottom: "10px", borderRadius: "5px" }}
          type="text"
          placeholder="Search for a flag..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {currentFlags.map((flag) => (
          <div key={flag.name.common}>
            <img
              src={flag.flags.svg}
              alt={flag.name.common}
              width={200}
              onClick={() => openModal(flag)}
            />
            {/* Implement your popup functionality here */}
            {/* Make API call to AccuWeather for flag's weather information */}
          </div>
        ))}
        <Pagination
          flagsPerPage={flagsPerPage}
          totalFlags={filteredFlags.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {selectedCountry && (
        <PopUp country={selectedCountry} closeModal={closeModal} />
      )}
    </section>
  );
};

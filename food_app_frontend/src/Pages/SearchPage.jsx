import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches] = useState(["Pizza Wings", "Burger", "Chinese"]);

  const popularCuisines = [
    {
      name: "Biryani",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Chinese",
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      name: "Dessert",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=100&h=100",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-28">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for restaurants and food"
            className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <IoMdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <RxCross2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Recent Searches
        </h2>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              onClick={() => setSearchQuery(search)}
            >
              <IoMdSearch className="w-4 h-4" />
              <span>{search}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Popular Cuisines
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {popularCuisines.map((cuisine, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setSearchQuery(cuisine.name)}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 group-hover:ring-2 ring-orange-500">
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-orange-500">
                {cuisine.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

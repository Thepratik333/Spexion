import React, { useState, useEffect } from "react";
import ArticleBox from "./ArticleBox";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles, searchArticles } from "../store/ArticleSlice";

function ArticleList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState("");
  console.log(sort);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    if (search || startDate || endDate || sort) {
      dispatch(searchArticles({ search, startDate, endDate, sort }));
    }
  }, [dispatch, search, startDate, endDate, sort]);

  // Function to sort articles
  const sortedArticles = () => {
    if (sort === "asc") {
      return [...articles].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === "dsc") {
      return [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      return articles;
    }
  };

  return (
    <div className="searchContainer min-h-[66.8vh] flex">
      <aside className="bg-gray-100 p-6 rounded-lg shadow-md w-60 h-[87vh] m-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">FILTER</h1>
        <div className="sort mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Sort</h3>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">None</option>
            <option value="asc">Oldest First</option>
            <option value="dsc">Newest First</option>
          </select>
        </div>
        <div className="date-range mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Date Range</h3>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </aside>

      <main className="p-2 px-3 rounded-lg shadow-md min-h-[87vh] bg-[#f5f5f5] my-4 w-full">
        <h1 className="py-2">PRODUCTS</h1>
        <div className="flex items-center border border-gray-300 rounded-md p-1">
          <div className="text-gray-400">
            <FaSearch className="text-[20px] mr-2 ml-2" />
          </div>
          <input
            type="text"
            placeholder="search by name ..."
            className="w-full bg-transparent outline-none p-[5px] mr-[20px] rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedArticles().map((article, index) => (
            <ArticleBox
              key={index}
              title={article.title}
              description={article.description}
              category={article.category}
              slug={article.slug}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ArticleList;

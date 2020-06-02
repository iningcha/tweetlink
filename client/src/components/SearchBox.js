import React, { useEffect, useState } from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaSearch } from 'react-icons/fa';
import './SearchBox.css'
import 'react-tabs/style/react-tabs.css';


const SearchBox = (props) => {

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState(`/findByHashTag`);

  useEffect(() => {
    setSearchResults([])
  }, [searchValue])

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(searchType+`?param=`+searchValue)
    const tweetItems = await response.json()
    setSearchResults(tweetItems.slice(0, 100))
  }

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

    return (
      <div className="searchContainer">
        <h1 className="title">Search</h1>
        <Tabs>
        <TabList>
          <Tab onClick={()=>setSearchType(`/findByHashTag`)}>Hashtag</Tab>
          <Tab onClick={()=>setSearchType(`/findByLocation`)}>Location</Tab>
        </TabList>
        <TabPanel/>
        <TabPanel/>
        </Tabs>
        <div className="searchBox">
          <form onSubmit={handleSearch}>
            <input
              className="input"
              type="text"
              onChange={handleChange}
              value={searchValue}
              placeholder="Search"
            />
            <FaSearch className="searchIcon" onClick={handleSearch}/>
          </form>
        </div>
        <div className="resultList">
          {searchResults.map((listItem, i) =>
            <TwitterTweetEmbed
              key={i}
              tweetId={listItem.id_str}
            />
          )}
        </div>
      </div>
    )

}
export default SearchBox

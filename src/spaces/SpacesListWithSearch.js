import React, { useContext, useEffect, useState } from "react";
import HappyHourApi from "../api/backendApi.js";
import SpaceCard from "./SpaceCard.js";
import UserContext from "../context/UserContext.js";
import { Link } from "react-router-dom";

/** Show page with list of spaces
 * 
 * loads spaces from HappyHour API.
 * Re-loads filtered spaces on submit from search form .
 * 
 * Routed to /spaces
 * Routes -> { SpaceCard, SearchForm}
 * Must be logged in to see spaces
 */

const SpacesListWithSearch = ({remove}) => {
  const textColor = { color: "#f4978e", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }
  const {currentUser} = useContext(UserContext)
    console.debug("SpacesListWithSearchBar");
    const [spaces, setSpaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
      rating: "",
      neighborhood: "",
      city: "",
      category: "",
      sortBy: "",
    });
    const [categories, setCategories] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [cities, setCities] = useState([]);
  
    useEffect(() => {

      const fetchSpaces = async () => {
        try {
          let apiParams = {
            title: searchTerm,
            ...filters,
          };
      
          if (filters.category) {
            apiParams.category = filters.category;
          }
          if(filters.sortBy){
            apiParams.sortBy = filters.sortBy;
          }
          if(filters.city){
            apiParams.city = filters.city;
          }
          if(filters.neighborhood){
            apiParams.neighborhood = filters.neighborhood;
          }
          const spaces = await HappyHourApi.findAllSpaces(apiParams);
          setSpaces(spaces.spaces);
        } catch (error) {
          console.error('Error fetching spaces:', error);
          if (error.response && error.response.status === 404) {

            return { spaces: [] };
          }
        }
      };
      
      
  
      fetchSpaces();
    }, [searchTerm, filters]);

    const getUserSpacesInfo = async () =>{
      try{
        const visitedSpacesResponse = await HappyHourApi.getVisited(currentUser.username);
        const likedSpacesResponse = await HappyHourApi.getLikedSpaces(currentUser.username);
        const visitedSpaces = visitedSpacesResponse || [];
        const likedSpaces = likedSpacesResponse || [];
        return {visitedSpaces, likedSpaces};
      } catch(e){
        console.error("Error fetching user spaces info", e);
        return{ visitedSpaces: [], likedSpaces: []}
      }
    };

    useEffect(() => {
      const getCategories = async () => {
        try {
          const categoriesData = await HappyHourApi.request("categories");
          setCategories(categoriesData.categories);
        } catch (error) {
          console.error("Error fetching categories", error);
        }
      };
    
      getCategories();
    }, []);

    useEffect(()=>{
      const getNeighborhoodsandCities = async ()=>{
        try{
          const locationData = await HappyHourApi.request("locations");

          const uniqueCitiesSet = new Set();

          locationData.locations.forEach((neighborhood)=> {
            uniqueCitiesSet.add(neighborhood.city);
          });

          const uniqueCitiesArray = Array.from(uniqueCitiesSet);

          setNeighborhoods(locationData.locations);
          setCities(uniqueCitiesArray);
        } catch(e){
          console.error("error fetching neighborhoods and cities", e);
        }
      };
      getNeighborhoodsandCities();
    }, []);

    const handleClearSearch = () => {
      setSearchTerm("");
      setFilters({
        rating: "",
        neighborhood: "",
        city: "",
        category: "",
        sortBy: "",
      });
    };
    
    return (
      <div>
        <div>
              {/* Search Bar */}
          <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>
      <div>
      <label>
        Category:
      <select 
        value={filters.category} 
        onChange={(e) => {
        setFilters({ ...filters, category: e.target.value });
        }}
      >
      <option value="">All Categories</option>
        {categories && categories.map((category) => (
      <option key={category.cat_id} value={category.cat_type}>
          {category.cat_type}
      </option>
        ))}
    </select>
    </label>
      </div>
      <div>
    <label>
      Neighborhood:
    <select 
      value={filters.neighborhood} 
      onChange={(e) => {
        setFilters({ ...filters, neighborhood: e.target.value });
      }}
      >
    <option value="">All Neighborhoods</option>
      {neighborhoods && neighborhoods.map((neighborhood) => (
    <option key={neighborhood.loc_id} value={neighborhood.neighborhood}>
        {neighborhood.city}, {neighborhood.neighborhood}
    </option>
      ))}
    </select>
  </label>
  </div>
  <div>
  <label>
    City:
    <select 
      value={filters.city} 
      onChange={(e) => {
        setFilters({ ...filters, city: e.target.value });
      }}
    >
      <option value="">All Cities</option>
      {cities && cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </label>
</div>




      <div>
        <button className="btn btn-light" onClick={() => setFilters({ ...filters, sortBy: "DESC" })}>Sort by Highest Rated</button>
        <button className="btn btn-light" onClick={() => setFilters({ ...filters, sortBy: "ASC" })}>Sort by Lowest Rated</button>
      </div>

      <button className="btn btn-light" onClick={handleClearSearch}>Clear Search</button>

         <h1 style={textColor}>List of Spaces</h1>
    <div>
      {!spaces ? (
        <p>No spaces found.</p>
      ) : (
        spaces.map((s) => (
              <SpaceCard
              key={s.space_id}
              title={s.title}
              description={s.description}
              category={s.category}
              address={s.address}
              est_year={s.est_year}
              city={s.city}
              neighborhood={s.neighborhood}
              averageRating={s.avg_rating}
              getUserSpacesInfo={getUserSpacesInfo}
              remove={remove}
          />
            ))
          )}
          </div>
          {currentUser.isAdmin ? 
          <Link to="/spaces/new">
            <button className="btn btn-light">Add a Space</button>
          </Link>
          :
          null}
        </div>
    )
  
};

export default SpacesListWithSearch;
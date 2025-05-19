import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Item from '../../components/Item/Item';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Using the local endpoint instead of the remote one
        const response = await axios.get(`https://splendid-upliftment-production-1cb8.up.railway.app/api/products/search?q=${query}`);
        
        // Detailed console logging to examine the response structure
        console.log('Full API response:', response);
        console.log('Response data:', response.data);
        
        if (response.data.products && response.data.products.length > 0) {
          response.data.products.forEach((product, idx) => {
            console.log(`Product ${idx}:`, product);
            console.log(`Product ${idx} _id:`, product._id);
            console.log(`Product ${idx} id:`, product.id);
          });
        }
        
        if (response.data.success) {
          const mappedProducts = response.data.products.map(product => ({
            ...product,
            id: product._id || product.id // fallback to id if _id is missing
          }));
          setResults(mappedProducts);
        } else {
          console.log('No success flag in response, setting empty results');
          setResults([]);
        }
        setError(null);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  // Log what we're passing to Item component
  useEffect(() => {
    if (results.length > 0) {
      console.log('Results being used for rendering:', results);
      results.forEach((item, index) => {
        console.log(`Item ${index} ID:`, item._id || item.id || 'MISSING ID');
      });
    }
  }, [results]);

  // Navigate to car details page when a car is clicked
  const handleCarClick = (item) => {
    const productId = item.id || item._id;
    if (!productId) {
      console.error("No product ID found:", item);
      return;
    }
    navigate(`/place-order/${productId}`);
  };

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Searching vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="error-container">
          <h3>Something went wrong</h3>
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <h1>Search Results for "{query}"</h1>
        <p>Found {results.length} vehicles</p>
      </div>

      {results.length > 0 ? (
        <div className="search-results-grid">
          {results.map((item) => (
            <div 
              key={item.id} 
              className="search-result-item-wrapper"
              onClick={() => handleCarClick(item)} // Pass the whole item object
            >
              <Item
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                images={item.images}
                year={item.year}
                mileage={item.mileage}
                transmission={item.transmission}
                fuelType={item.fuelType}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-found">
          <h3>No vehicles found matching "{query}"</h3>
          <p>Try using different keywords or browse our vehicle collection</p>
          <button onClick={() => navigate('/')}>
            Browse All Vehicles
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
import React from 'react';
import axios from 'axios';
import '../../Styles/wallpaper.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Wallpaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      suggestions: [],
      searchText: '',
      selectedCity: '',
    };
  }

  handleLocationChange = (event) => {
    const locationName = event.target.value;
    axios({
      method: 'GET',
      url: `http://localhost:3003/restaurants`,
      headers: { 'Content-Type': 'application/json' },
      params: { city_name: locationName }
    })
      .then(response => {
        this.setState({
          restaurants: response.data,
          suggestions: [],
          searchText: '',
          selectedCity: locationName,
        });
      })
      .catch(error => console.log(error));
  };

  handleSearch = (event) => {
    const { restaurants } = this.state;
    const searchText = event.target.value;
    let filteredList;
    if (searchText === '') {
      filteredList = [];
    } else {
      filteredList = restaurants.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      });
    }
    this.setState({ suggestions: filteredList, searchText: searchText });
  };

  handleRestaurantClick = (resaurantId) => {
    this.props.history.push(`/details?restaurant=${resaurantId._id}`)
}

  renderSuggestions = () => {
    const { suggestions, searchText, selectedCity } = this.state;
    if (suggestions.length === 0 && searchText) {
      return (
        <ul>
          <li>No Matches found</li>
        </ul>
      );
    }
  
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.city_name === selectedCity
    );
  
    return (
      <ul className="unorderedList" style={{ color: "white" }}>
        {filteredSuggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => this.handleRestaurantClick(item)}
          >
            <img src={`${item.image}`} className="resIcon" alt="" />
            {`${item.name}, ${item.city_name}`}
          </li>
        ))}
      </ul>
    );
  };
  

  render() {
    const { locationValues } = this.props;
    const uniqueCities = Array.from(new Set(locationValues.map(item => item.city_name)));

    return (
      <div className="app" style={{ color: "black", border: "3px" }}>
        <img src="./Images/Home_Pic.png" className="MainPic" alt="" />
        <div>
          <b className="logo">e!</b>
        </div>
        <div className="heading">Find the best restaurants, cafes, and bars</div>
        <div className="locationSelector">
          <select className='locationDropdown' onChange={this.handleLocationChange}>
            <option value="0">Select</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          <div id="notebooks">
            <input id="query" type="text" placeholder='Search for Restaurants' onChange={this.handleSearch} />
            {this.renderSuggestions()}
          </div>
          <span className='glyphicon glyphicon-search search'></span>
        </div>
      </div>
    );
  }
}

export default Wallpaper;
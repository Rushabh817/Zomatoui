import React from 'react';
import axios from 'axios';
import '../../Styles/Filter.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class FilterRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: [],
      locationValues: [],
      selectedLocation: '',
      selectedCuisine: '',
      selectedCost: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3003/restaurants', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        this.setState({ locationValues: response.data });
      })
      .catch(error => console.log(error));

    axios
      .get('http://localhost:3003/restaurants', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        this.setState({ restaurantData: response.data });
      })
      .catch(error => console.log(error));
  }

  handleLocationChange = event => {
    const selectedLocation = event.target.value;
    this.setState({ selectedLocation }, () => {
      this.handleFilter(selectedLocation );
    });
  };

  handleCuisineChange = event => {
    const selectedCuisine = event.target.value;
    this.setState({ selectedCuisine }, () => {
      this.handleFilter();
    });
  };
  

  handleCostChange = event => {
    const selectedCost = event.target.value;
    this.setState({ selectedCost }, () => {
      this.handleFilter(this.state.selectedLocation, this.state.selectedCuisine);
    });
  };

  handleFilter = () => {
    const { selectedLocation, selectedCuisine, selectedCost } = this.state;
    const { restaurantData } = this.state;
  
    let filteredRestaurants = restaurantData;
  
    if (selectedLocation !== '') {
      filteredRestaurants = filteredRestaurants.filter(
        item => item.city_name === selectedLocation
      );
    }
  
    if (selectedCuisine !== '') {
      filteredRestaurants = filteredRestaurants.filter(item =>
        item.Cuisine.some(cuisine => cuisine.cuisine_type === selectedCuisine)
      );
    }
  
    if (selectedCost !== '') {
      filteredRestaurants = filteredRestaurants.filter(
        item => item.cost === selectedCost
      );
    }
  
    this.setState({ filteredRestaurants });
  };
  
  
    
  render() {
    const { restaurantData, locationValues } = this.state;
    const uniqueCities = [...new Set(locationValues.map(item => item.city_name))];
    const selectedLocation = this.state.selectedLocation;

    const filteredRestaurants = selectedLocation
      ? restaurantData.filter(item => item.city_name === selectedLocation)
      : restaurantData;

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-ms-12 col-lg-12"></div>
            <div className="col-sm-12 col-ms-12 col-lg-12">
              <h1 className="Filterbreakfast">Places in Mumbai</h1>
            </div>
            <div className="col-sm-12 col-ms-12 col-lg-12"></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="Filterrectangle">
                <div className="FilterFilt">Filters</div>
                <div className="Filter-Select-Location">Select Location</div>
                <div>
                  <select className="locationDropdown" onChange={this.handleLocationChange}>
                    <option value="0">Select</option>
                    {uniqueCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">Cuisine</div>
                <div>
                  <input
                    type="checkbox"
                    className="check"
                    value="North Indian"
                    onChange={this.handleCuisineChange}
                  />
                  <span className="head">North Indian</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="check"
                    value="South Indian"
                    onChange={this.handleCuisineChange}
                  />
                  <span className="head">South Indian</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="check"
                    value="Chinese"
                    onChange={this.handleCuisineChange}
                  />
                  <span className="head">Chinese</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="check"
                    value="Fast Food"
                    onChange={this.handleCuisineChange}
                  />
                  <span className="head">Fast Food</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="check"
                    value="Street Food"
                    onChange={this.handleCuisineChange}
                  />
                  <span className="head">Street Food</span>
                </div>
                <div className="CostFilter">Cost for Two</div>
                <div>
                  <input
                    type="radio"
                    className="radiobutton"
                    name="cost"
                    value="less_than_500"
                    onChange={this.handleCostChange}
                  />
                  <span className="head">Less than Rs. 500</span>
                </div>
                <div>
                  <input
                    type="radio"
                    className="radiobutton"
                    name="cost"
                    value="500_to_1000"
                    onChange={this.handleCostChange}
                  />
                  <span className="head">Rs. 500 to Rs. 1000</span>
                </div>
                <div>
                  <input
                    type="radio"
                    className="radiobutton"
                    name="cost"
                    value="1000_to_1500"
                    onChange={this.handleCostChange}
                  />
                  <span className="head">Rs. 1000 to Rs. 1500</span>
                </div>
                <div>
                  <input
                    type="radio"
                    className="radiobutton"
                    name="cost"
                    value="1500_to_2000"
                    onChange={this.handleCostChange}
                  />
                  <span className="head">Rs. 1500 to Rs. 2000</span>
                </div>
                <div>
                  <input
                    type="radio"
                    className="radiobutton"
                    name="cost"
                    value="2000_plus"
                    onChange={this.handleCostChange}
                  />
                  <span className="head">Rs. 2000+</span>
                </div>
                <div className="FilterSort">Sort</div>
                <div>
                  <input type="radio" className="radiobutton" name="sort" />
                  <span className="head">Price low to high</span>
                </div>
                <div>
                  <input type="radio" className="radiobutton" name="sort" />
                  <span className="head">Price high to low</span>
                </div>
              </div>
            </div>
            <div className="col-sm-8 col-md-8 col-lg-8">
              {filteredRestaurants.map(item => (
                <div className="FilterItems" key={item._id}>
                  <img src={item.image} className="FilterPic1" alt="Restaurant" />
                  <div className="FilterTheBigChill">{item.name}</div>
                  <div className="FilterFort">{item.address}</div>
                  <div className="FilterAddress">{`${item.locality}, ${item.city_name}`}</div>
                  <div>
                    <hr />
                  </div>
                  <div className="FilterCUISINES">  {item.Cuisine.map(cuisine => cuisine.cuisine_type).join(', ')}</div>
                  <div className="FilterCOSTFOR2">Cost for two: Rs. {item.cost}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterRestaurants;    
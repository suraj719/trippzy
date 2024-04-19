import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Background from "./Background";
import "../Styles/Header.css";

class Header extends Component {
  state = {
    experience: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeExperience = (event) =>
    this.setState({ experience: event.target.value });

  render() {
    const { backgroundImagesData, navigationData, selectedCity, history } =
      this.props;
    return (
      <React.Fragment>
        <Background backgroundImagesData={backgroundImagesData} />
        <div className="search-bar-div">
          <div className="select-city-large">
            <i className="fas fa-map-marker color-black" />
            <Searchbar
              style={customStyles}
              history={this.props.history}
              selectedCity={this.props.selectedCity}
            />
          </div>
          <div className="select-experience-large">
            <input
              className="inp-sele"
              type="text"
              placeholder="Search for experiences"
              onChange={this.changeExperience}
              value={this.state.experience}
            />
            <i className="fas fa-search" />
          </div>
          <button id="go">Let's Go</button>
        </div>
      </React.Fragment>
    );
  }
}

export class HeaderNav extends Component {
  static defaultProps = {
    navigationData: [
      {
        id: 1,
        name: "TrippZy Picks",
      },
      {
        id: 2,
        name: "Best Sellers",
      },
      {
        id: 3,
        name: "Abu Dhabi City Tours",
      },
      {
        id: 4,
        name: "Amsterdam Attractions",
      },
      {
        id: 5,
        name: "Burj Khalifa",
      },
    ],
  };
  render() {
    const { navigationData } = this.props;
    return (
      <div className="header-wrap">
        <div className="header-wrapper navbar-fixed-top">
          <div className="header-left">
            <div className="header-right"></div>
          </div>
        </div>
      </div>
    );
  }
}

const options = [{ value: "hyderabad", label: "Hyderabad" }];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "none",
    color: state.isSelected ? "red" : "#727272",
    padding: 10,
    cursor: "pointer",
    background: state.isSelected ? "white" : "white",
    fontSize: "13px",
    textAlign: "left",
    width: 120,
  }),
  control: () => ({
    width: 150,
    display: "flex",
    fontSize: "14px",
    marginTop: "10px",
    paddingLeft: "5px",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const smallSearchbar = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "none",
    color: state.isSelected ? "red" : "#727272",
    padding: 10,
    cursor: "pointer",
    background: state.isSelected ? "white" : "white",
    fontSize: "13px",
    textAlign: "left",
    paddingLeft: "20px",
    width: 150,
  }),
  control: () => ({
    width: 150,
    display: "flex",
    fontSize: "11px",
    marginLeft: "15px",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

class Searchbar extends Component {
  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    this.changeUrl(selectedOption.value);
  };

  changeUrl = (url) => {
    // this.props.history.push(`/cities/${url}`);
  };

  render() {
    const { selectedOption } = this.state;
    const { selectedCity } = this.props;
    if (selectedCity) {
      return (
        <Select
          styles={this.props.style}
          placeholder={selectedCity}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          className="city-select-dropdown"
        />
      );
    } else {
      return (
        <Select
          styles={this.props.style}
          placeholder="Select City"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          className="city-select-dropdown"
        />
      );
    }
  }
}
export default Header;

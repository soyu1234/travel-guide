import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import globe from './Globe.svg';
import RegionList from './components/RegionList';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import SearchBox from './components/SearchBox';
import AppRouter from './routes/AppRouter'
// import Region from './components/Region';
// import RegionList from './components/RegionList';
// import Header from './components/Header.js'
// import Footer from './components/Footer.js'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      regionList: [],
      countryList: [],
      searchField: '',
      countries: []
    };
  }

  componentDidMount(){
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => {
        return response.json();
      })
      .then(countries => {
        let regionList = [];
        let countryList = [];
        countries.forEach(country => {
          regionList.push(country.region);
          countryList.push(country.name);
        });
        this.setState({countries: countries});
        this.setState({regionList: this.findUniqRegions(regionList)});
        this.setState({countryList: countryList})
      });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })        
  }

  findUniqRegions = (regionList) => {
    const newRegionList = regionList.filter(region => {
      return region !== "";
    });
    return Array.from(new Set(newRegionList)).sort();
  }

  render() {
    const filteredCountries = this.state.countries.filter((country, i) =>{
      return this.state.countries[i].name.toLowerCase().includes(this.state.searchField.toLowerCase());      
    })

    return (    
      <div className='tc'>
        <Header />
        <SearchBox searchChange={this.onSearchChange}/>
        <RegionList countries={filteredCountries} 
          regions={this.state.regionList}>
        </RegionList>        
        <Footer />     
      </div>
    );
    console.log(this.state.regionList);
    return <AppRouter state={this.state}/>
  }
}

export default App;
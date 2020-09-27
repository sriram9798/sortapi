import React, {Component} from 'react';

const locationUrl = 'http://localhost:7000/location';
const url = 'http://localhost:7000/restaurants/'

class CityFilter extends Component {
    constructor() {
        super();

        this.state = {
            locations: []
        }
    }

    handleLocation = (locations) => {
        if(locations) {
            return locations.map(location => {
                return(
                    <option value={location.city}>{location.city_name}</option>
                )
            })
        }
    }

    cityfilterLogic = (event) => {
        let mealtype = sessionStorage.getItem('type');
        let cityid = event.target.value;
        
        const cityfilterUrl =  `${url}${mealtype}?city=${cityid}`;

        fetch(cityfilterUrl,{method:'GET'})
        .then(res => res.json())
        .then(data => this.props.datapercity(data))
    }

    render() { 
        var {locations} = this.state;
        return (
            <div className="places mt-2 ml-4">
                <label htmlFor="location selectOption">Select location</label>
                <select onChange={this.cityfilterLogic} name="city" className="form-control" id="location">
                    <option value="Select location">Select location</option>
                    {this.handleLocation(locations)}
                </select>            
            </div>
        );
    }

    componentDidMount() {
        fetch(locationUrl,{method:'GET'})
        .then(res => res.json())
        .then(data => this.setState({locations:data}))
    }
}
 
export default CityFilter;
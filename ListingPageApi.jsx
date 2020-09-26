import React, {Component} from 'react';
import ListingPageDisplay from './ListingPageDisplay.jsx';
import CitySort from './Filters/CostSort.jsx';
import '../../Styles/Filters.css';

const ListingUrl = 'http://localhost:7000/restaurants?mealtype=';

class ListingPageApi extends Component {
    constructor() {
        super();
        this.state = {
            restaurantList: ''
        }
    }

    handleSortprice = (data) => {
        this.setState({restaurantList:data})
    }

    render() { 
        return (
            <div className="row">
                <div className="col-md-2 filter mt-4 shadow">
                    <div className="filterHeading mt-3 ml-4">Filters</div>
                    <div className="filterSort">
                        <CitySort sortprice={(data) => {this.handleSortprice(data)}}></CitySort>
                    </div>
                </div>
                <div className="col-md-6">
                    <ListingPageDisplay restdata={this.state.restaurantList}></ListingPageDisplay> 
                </div>
            </div>
        );
    }

    componentDidMount() {
        var mealType = this.props.match.params.mealtypeid;
        sessionStorage.setItem('type',mealType);
        fetch(`${ListingUrl}${mealType}`,{method:'GET'})
        .then(res => res.json())
        .then(data => this.setState({restaurantList: data}))
    }
}
 
export default ListingPageApi;
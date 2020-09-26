import React, {Component} from 'react';

const url = 'http://localhost:7000/restaurants/';

class CitySort extends Component {
    constructor() {
        super();
    }

    costsortLogic = (event) => {
        var mealtype = sessionStorage.getItem('type');
        var cost = event.target.value;
        
        const costsortUrl = `${url}${mealtype}?hTol=${cost}`; 
        
        fetch(costsortUrl,{method:'GET'})
        .then(res => res.json())
        .then(data => this.props.sortprice(data))
    }

    render() { 
        return (
            <div onChange={this.costsortLogic}>
                <div className="sort mt-4">Sort</div>
                <div className="custom-control custom-radio mt-3">
                    <input className="custom-control-input" id="customRd6" type="radio" name="sort" value="1"/>
                    <label className="cuisineCost custom-control-label" htmlFor="customRd6">Price low to high</label>
                </div>
                <div className="custom-control custom-radio mt-2">
                    <input className="custom-control-input" id="customRd7" type="radio" name="sort" value="-1"/>
                    <label className="cuisineCost custom-control-label" htmlFor="customRd7">Price high to low</label>
                </div>
            </div>
        );
    }
}
 
export default CitySort;
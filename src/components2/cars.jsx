import React, { Component } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import http from "./httpService";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class Cars extends Component {
  state = {
    data: {},
    options: {},
  };
  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchString = this.makeSearchString(queryParams);
    let respone = await http.get(`/cars?${searchString}`);
    let data = respone;
    console.log(data);
    this.setState({ data: data.data });
  }
  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.options[input.name] = input.value;
    console.log(s1);
    this.handleChangeoptions(s1.options);
  };
  handleChangeoptions=(options)=>{
    this.callURL(`/cars`,options)
  }
  callURL = (url, options) => {
    console.log(options);
    let searchString = this.makeSearchString(options);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  makeSearchString = (options) => {
    let { minPrice, maxPrice, fuel, type,sortBy } = options;
    console.log(minPrice);
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "minPrice", minPrice);
    searchStr = this.addToQueryString(searchStr, "maxPrice", maxPrice);
    searchStr = this.addToQueryString(searchStr, "fuel", fuel);
    searchStr = this.addToQueryString(searchStr, "type", type);
    searchStr = this.addToQueryString(searchStr, "sortBy", sortBy);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  render() {
    const { cars = [] } = this.state.data;
    const { options } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel options={queryParams} onOptionChange={this.handleChangeoptions}/>
          </div>
          <div className="col-9">
            <h3 className="text-center">All Cars</h3>
            <br />
            <div className="row">
              <div className="col-3 fw-bold">Price:Range</div>
              <div className="col-3">
                <input
                  className="form-control"
                  type="text"
                  name="minPrice"
                  id="minPrice"
                  defaultValue={options.minPrice}
                  onKeyPress={this.handleChange}
                  onChange={this.handleChange}
                  placeholder="Min Price"
                />
              </div>
              <div className="col-3">
                <input
                  className="form-control"
                  type="number"
                  name="maxPrice"
                  defaultValue={options.maxPrice}
                  onKeyPress={this.handleChange}
                  onChange={this.handleChange}
                  placeholder="Max Price"
                />
              </div>
            </div>
            <br />
            <div className="row">
              {cars.map((e) => (
                <div className="col-3 border border-2 text-center bg-warning text-dark" key={e.id}>
                  <p className="fw-bold">{e.id}</p>
                  Price: {e.price}
                  <br />
                  Color: {e.color}
                  <br />
                  Mileage: {e.kms}
                  <br />
                  Manufactured in {e.year}
                  <br />
                  <div className="row">
                    <div className="col-3">
                      <Link to={`/cars/${e.id}/edit`}>
                        <FaEdit className=" text-dark" />
                      </Link>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3">
                      <Link to={`/cars/${e.id}/delete`}>
                        <FaTrash className=" text-dark" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cars;

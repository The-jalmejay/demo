import React, { Component } from "react";
import http from "./httpService";
class NewCar extends Component {
  state = {
    cars: { id: "", price: "", kms: "", year: "", model: "", color: "" },
    carMaster: [],
    edit: false,
  };
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    console.log(id);
    let response = await http.get(`/cars`);
      let data2= response.data.carMaster;
      //console.log(data2);
    if (id) {
      console.log(id);
      let response = await http.get(`/cars/${id}`);
      let data = response;
      console.log(data);
      this.setState({ cars: data.data,carMaster: data2, edit: true });
    } else {
       let cars = { id: "", price: "", kms: "", year: "", model: "", color: "" };
      this.setState({ cars:cars, carMaster: data2, edit: false });
    }
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.cars[input.name] = input.value;
    console.log(s1.cars);
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { cars, edit } = this.state;
    console.log(cars,edit);
    edit
      ? this.putData(`/cars/${cars.id}`, cars)
      : this.postData("/cars", this.state.cars);
  };
  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/cars");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/cars");
  }
  render() {
    const {
      id = "",
      price = "",
      kms = "",
      year = "",
      model = "",
      color = "",
    } = this.state.cars;
    const { carMaster=[]} = this.state;
    //console.log(carMaster);
    let modelArr = carMaster.reduce(
      (acc, cur) =>
        acc.find((a1) => a1 === cur.model) ? acc : [...acc, cur.model],
      []
    );
    let colorArr =model?carMaster.find(e=>e.model===model).colors:[];
    //console.log(colorArr);
    return (
      <div className="container">
        <br />
        {this.showinbox("Car Id", id, "id")}
        <br />
        {this.showinbox("Price", price, "price")}
        <br />
        {this.showinbox("Mileage in Kms", kms, "kms")}
        <br />
        {this.showinbox("Year of Manufacture", year, "year")}
        <br />
        <div className="row">
          <div className="col-6">
            {this.makeDropdown(
              modelArr,
              model,
              "model",
              "Select Model",
              "Model"
            )}
          </div>
          <div className="col-6">
            {this.makeDropdown(
              colorArr,
              color,
              "color",
              "Select Color",
              "Color"
            )}
          </div>
        </div>
        <br />
        <div className="text-center">
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
  makeDropdown = (arr, value, name, label, label2) => (
    <div className="form-group">
      <label className="fw-bold">{label2}</label>
      <br />
      <select
        className="form-control"
        name={name}
        value={value}
        onChange={this.handleChange}
      >
        <option value="">{label}</option>
        {arr.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
  showinbox = (label, value, name) => {
    //console.log(value);
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="fw-bold">{label}</label>
          <input
            type="text"
            className="form-control"
            id={name}
            name={name}
            value={value}
            onBlur={this.handleValidate}
            onChange={this.handleChange}
          />
        </div>
      </React.Fragment>
    );
  };
}
export default NewCar;

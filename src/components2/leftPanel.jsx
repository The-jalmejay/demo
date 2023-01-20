import React, { Component } from "react";
class LeftPanel extends Component {
  state = {
    fuelArr: ["Diesel", "Petrol"],
    typeArr: ["Hatchback", "Sedan"],
    sortArr: ["kms", "price", "year"],
  };
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
    this.props.onOptionChange(options);
  };
  render() {
    const { fuel, type, sortBy } = this.props.options;
    const { fuelArr, typeArr, sortArr } = this.state;
    return (
      <div>
        <br/>
        {this.makeRadioboxes(fuelArr, fuel, "fuel", "fuel")}
        <br />
        {this.makeRadioboxes(typeArr, type, "type", "type")}
        <br />
        {this.makeRadioboxes(sortArr, sortBy, "sortBy", "sortBy")}
        <br />
      </div>
    );
  }
  makeRadioboxes = (arr, values, name, label) => (
    <React.Fragment>
      <div className="row">
        <div className="col-12 border">
          <label className="fw-bold">{label}</label>
          <br />
        </div>
        {arr.map((opt, index) => (
          <div className="col-12 border">
            <div className="form-check " key={opt}>
              <input
                className="form-check-input"
                value={opt}
                type="radio"
                name={name}
                checked={values === opt}
                onChange={this.handleChange}
              />
              <label className="form-check-label">{opt}</label>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
export default LeftPanel;

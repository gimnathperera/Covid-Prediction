import React from "react";

const List = ({ countries, selected, selectItem }) => {
  return (
    <>
      {countries.map((item) => (
        <li
          key={item}
          onClick={selectItem}
          className={selected === item ? "selected" : ""}
        >
          {item}
        </li>
      ))}
    </>
  );
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      active: false,
    };
  }

  toggle = () => {
    this.setState({ active: !this.state.active });
  };

  selectItem = (e) => {
    const selected = e.target.innerText;
    this.props.setSelectedCountry(selected);

    this.toggle();
  };

  render() {
    return (
      <div className="dropdown" onClick={this.toggle}>
        <p>{this.props.selectedCountry}</p>
        <a
          href="#!"
          className={`dropdown_toggler ${this.state.active ? " up" : " down"}`}
          onClick={this.toggle}
        >
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </a>
        <ul className={this.state.active ? "active" : ""}>
          {this.props.countries.map((item) => (
            <li
              key={item}
              onClick={this.selectItem}
              className={this.props.selectedCountry === item ? "selected" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dropdown;

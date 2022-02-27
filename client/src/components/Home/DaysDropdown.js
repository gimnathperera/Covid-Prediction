import React from 'react';

const dayList = [
  { value: 3, name: '3 Days' },
  { value: 5, name: '5 Days' },
  { value: 7, name: '1 Week' },
  { value: 14, name: '2 Weeks' },
  { value: 21, name: '3 Weeks' },
  { value: 30, name: '1 Month' },
];

class DaysDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  toggle = () => {
    this.setState({ active: !this.state.active });
  };

  selectItem = (e) => {
    const selected = e.target.value;
    this.props.setSelectedDayCount(selected);

    this.toggle();
  };

  render() {
    return (
      <div className='dropdown' onClick={this.toggle}>
        <p>{this.props.selectedDayCount} Days</p>
        <a
          href='#!'
          className={`dropdown_toggler ${this.state.active ? ' up' : ' down'}`}
          onClick={this.toggle}
        >
          <i className='fa fa-chevron-down' aria-hidden='true'></i>
        </a>
        <ul className={this.state.active ? 'active' : ''}>
          {dayList.map(({ value, name }) => (
            <li
              key={value}
              onClick={this.selectItem}
              className={
                this.props.selectedDayCount === value ? 'selected' : ''
              }
              value={value}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DaysDropdown;

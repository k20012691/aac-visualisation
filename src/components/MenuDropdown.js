import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Input } from 'reactstrap';

function MenuDropdown(props) {
  const { name, data, selectedFilters, onFilterChange } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    const updatedFilters = checked
      ? [...selectedFilters, value]
      : selectedFilters.filter((filter) => filter !== value);
    onFilterChange(updatedFilters);
  };

  useEffect(() => {
    const initialFilters = data;
    onFilterChange(initialFilters);
  }, [data]);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>{name}</DropdownToggle>
        <DropdownMenu>
          {data.map((option) => (
            <DropdownItem key={option}>
              <Label check>
                <Input
                  type="checkbox"
                  value={option}
                  checked={selectedFilters.includes(option)}
                  onChange={handleFilterChange}
                />
                {option}
              </Label>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default MenuDropdown;



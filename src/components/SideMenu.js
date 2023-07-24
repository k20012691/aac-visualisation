import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'reactstrap';
import './components.css';
import MenuDropdown from './MenuDropdown';

function SideMenu(props) {
  const { onFilterChange } = props;

  const [selectedFilters, setSelectedFilters] = useState({
    inputs: [],
    outputs: [],
    communities: []
  });

  const handleFilterChange = (category, filters) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: filters,
    }));
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <Container fluid className="d-flex flex-column h-100" style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
      <div className='heading'>AAC Visualisation Repository</div>
      <div className='para'>This repository houses a diverse collection of research papers, 
        providing insights into the latest advancements and methodologies in the field.
      </div>
      <div className='filter-title'>FILTERS</div>
      <div className='dropdowns'>
        <MenuDropdown 
          name="Interaction Input" 
          data={props.input} 
          selectedFilters={selectedFilters.inputs}
          onFilterChange={handleFilterChange.bind(null, 'inputs')}
        />
        <MenuDropdown 
          name="Community of Focus" 
          data={props.communities} 
          selectedFilters={selectedFilters.communities}
          onFilterChange={handleFilterChange.bind(null, 'communities')}
        />
        <MenuDropdown 
          name="Output Modality" 
          data={props.output} 
          selectedFilters={selectedFilters.outputs}
          onFilterChange={handleFilterChange.bind(null, 'outputs')}
        />
      </div>
      <div className='filter-title'>SORT BY</div>
      <div className='dropdowns'>
        <span>Year of Publication</span>
        <span>Author Name</span>
      </div>
    </Container>
  );
}

export default SideMenu;

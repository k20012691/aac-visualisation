import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'reactstrap';
import './components.css';
import MenuDropdown from './MenuDropdown';

function SideMenu(props) {
  const [selectedFilters, setSelectedFilters] = useState({
    inputs: [],
    outputs: [],
    communities: []
  });

  const handleFilterChange = useCallback((category, filters) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [category]: filters,
    }));
  }, []);

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);
  

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
    </Container>
  );
}

export default SideMenu;

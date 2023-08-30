import React, { useEffect, useState } from 'react';
import PaperList from './PaperList';
import { Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl, Box, Divider } from '@mui/material';

function PaperListView({ database }) {
  const [headers, setHeaders] = useState([]);

  async function getHeaders() {
    if (database.length > 0) {
      const csvHeaders = Object.keys(await database[0]);
      setHeaders(csvHeaders);
    }
  }

  function getCheckboxFilters(filter) {
    if (filter === 'scalar-attributes') {
      return headers.filter(header => (
        header.startsWith('RQ1 - Scalar attributes')
      ));
    }
    if (filter === 'output-modalities') {
      return headers.filter(header => (
        header.startsWith('RQ1 - Output modality')
      ))
    }
    if (filter === 'interaction-input') {
      return headers.filter(header => (
        header.startsWith('RQ1 - Interaction Input')
      ))
    }
    return [];
  }

  const scalarAttributes = getCheckboxFilters('scalar-attributes');
  const outputModalities = getCheckboxFilters('output-modalities');
  const interactionInputs = getCheckboxFilters('interaction-input');

  const allFilters = [...scalarAttributes, ...outputModalities, ...interactionInputs]
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(allFilters);


  useEffect(() => {
    getHeaders();
  }, [database]);

  const handleCheckboxChange = (event) => {
    const checkboxId = event.target.id;
    setSelectedCheckboxes(prevState => {
      if (event.target.checked) {
        return [...prevState, checkboxId];
      } else {
        return prevState.filter(id => id !== checkboxId);
      }
    });
  };

  return (
    <div>
      <div id='title'>Academic Research</div>
      <div id='para'>Insights into the latest advancements and methodologies in the field.</div>
      <Box
        sx={{
          display: 'grid',
          marginTop: '1rem',
          gridAutoFlow: 'column',
          gap: 1
        }}
      >
        <FormControl size='small'>
          <InputLabel>Scalar Attributes</InputLabel>
          <Select label="Scalar Attributes" defaultValue="">
          {scalarAttributes.map(item => (
            <MenuItem key={item}>
              <Checkbox
                id={item}
                checked={selectedCheckboxes.includes(item)}
                onChange={handleCheckboxChange}
              />
              <ListItemText primary={item.slice(26)} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl size='small'>
          <InputLabel>Output Modalities</InputLabel>
            <Select label="Output Modalities" defaultValue="">
            {outputModalities.map(item => (
              <MenuItem key={item}>
                <Checkbox
                  id={item}
                  checked={selectedCheckboxes.includes(item)}
                  onChange={handleCheckboxChange}
                />
                <ListItemText primary={item.slice(24)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size='small'>
          <InputLabel>Interaction Inputs</InputLabel>
            <Select label="Interaction Inputs" defaultValue="">
            {interactionInputs.map(item => (
              <MenuItem key={item}>
                <Checkbox
                  id={item}
                  checked={selectedCheckboxes.includes(item)}
                  onChange={handleCheckboxChange}
                />
                <ListItemText primary={item.slice(25)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{
        padding: '1rem 0 1rem 0',
        borderColor: '#8089AC',
        width: '100%'
      }} />
      <PaperList database={database} attrFilters={selectedCheckboxes} />
    </div>
  );
}

export default PaperListView;

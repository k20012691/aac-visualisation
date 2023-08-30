import React from 'react'
import Paper from './Paper';

import { ReactComponent as Camera } from '../img/camera.svg'
import { ReactComponent as Contextual } from '../img/contextual.svg'
import { ReactComponent as Gestural } from '../img/gestural.svg'
import { ReactComponent as Mechanical } from '../img/mechanical.svg'
import { ReactComponent as Oriental } from '../img/oriental.svg'
import { ReactComponent as Tactile } from '../img/tactile.svg'
import { ReactComponent as Verbal } from '../img/verbal.svg'
import { Tooltip } from '@mui/material';

function PaperList({ database, attrFilters }) {
  const filteredData = database.filter(paper => {
    for (var filter in attrFilters) {
        if (paper[attrFilters[filter]] === '1') {
          return true;
      }
    }
    return false;
  });
  
  function authorCount(authors) {
    const authorList = authors.split(', ');
    const authorCount = authorList.length;

    if (authorCount >= 3) {
      const lastName = authorList[0].split(' ')[0]
      const formattedAuthors = `${lastName} et al.`;
      return formattedAuthors;
    }

    return authors;
  }

  function getTitle(title) {
    if (title.length > 38) {
      title = title.substring(0, 38) + '...'
    }
    return title
  }

  function getIcons(paper) {
    let iconArr = []
    for (const key in paper) {
      if (key.startsWith("RQ1 - Interaction Input")) {
        const value = paper[key]
        if (value === "1") {
          const attributeName = key.replace("RQ1 - Interaction Input - ", "");
          iconArr.push(attributeName);
        }
      }
    }

    if (iconArr.length > 2) {
      iconArr = iconArr.slice(0, 2);
    }

    const iconComponents = iconArr.map(attr => {
      switch (attr) {
        case 'Camera ':
          return <Tooltip title="Camera" arrow><Camera /></Tooltip>;
        case 'Contextual':
          return <Tooltip title="Contextual" arrow><Contextual /></Tooltip>;
        case 'Gestural':
          return <Tooltip title="Gestural" arrow><Gestural /></Tooltip>
        case 'Mechanical':
          return <Tooltip title="Mechanical" arrow><Mechanical /></Tooltip>;
        case 'Oriental':
          return <Tooltip title="Oriental" arrow><Oriental /></Tooltip>;
        case 'Tactile':
          return <Tooltip title="Tactile" arrow><Tactile /></Tooltip>;
        case 'Verbal':
          return <Tooltip title="Verbal" arrow><Verbal /></Tooltip>;
        default:
          return null;
      }
    })
    
    return iconComponents;
  }

  return (
    <div style={{ overflowY: 'scroll', height: '28rem' }}>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredData.map((paper, index) => (
          <li key={index}>
            <Paper 
              id={index + 1}
              name={getTitle(paper['Title'])}
              link={paper['Link']}
              icons={getIcons(paper)}
              authors={authorCount(paper['Authors'])}
              year={paper['Year']}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaperList;

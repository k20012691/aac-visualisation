import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import './components.css'

function Heatmap(props) {
  const [counts, setCounts] = useState({}); // Store counts in component state
  const attributes = props.attributes;
  const communities = props.communities;
  const svgRef = useRef(null); // Create a ref for the SVG element

  useEffect(() => {
    const initialDatabase = props.data;

    let counts = [];

    communities.forEach((comm) => {
      if (!counts[comm]) {
        counts[comm] = {};
      }
      attributes.forEach((attr) => {
        if (!counts[comm][attr]) {
          counts[comm][attr] = 0;
        }
        initialDatabase.forEach((paper) => {
          if (paper[`RQ1 - Scalar attributes - ${attr}`] == 1 && paper[`RQ3 - Community of Focus  - ${comm}`] == 1) {
            counts[comm][attr]++;
          }
        });
      });
    });

    setCounts(counts); // Update the counts in state
  }, [props.data, attributes, communities]);

  useEffect(() => {
    // Create the SVG when counts are updated
    var margin = { top: 20, right: 20, bottom: 20, left: 20 };
var height = 350 - margin.top - margin.bottom;
var width = 550 - margin.left - margin.right;

var svg = d3
  .select(svgRef.current)
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + 50 + ')');

// Get the list of communities and scalar attributes dynamically
const communitiesOfFocus = Object.keys(counts);
const scalarAttributes = Array.from(
  new Set(
    Object.values(counts).flatMap((obj) => Object.keys(obj))
  )
);

var xScale = d3.scaleBand().domain(scalarAttributes).range([0, width]);
var yScale = d3.scaleBand().domain(communitiesOfFocus).range([0, height]);

const colours = [
  '#F5F5F5',
  '#CDE7FF',
  '#80C2FF',
  '#0487FF',
  '#0059AB',
  '#002D56'
];

const colorScale = d3
  .scaleOrdinal()
  .domain([0, d3.max(Object.values(counts), (d) => d3.max(Object.values(d)))])
  .range(colours);

svg
  .selectAll('.heatmap-rect')
  .data(scalarAttributes)
  .enter()
  .selectAll('.heatmap-rect')
  .data(function (d) {
    return communitiesOfFocus.map(function (community) {
      const communityName = community.trim();
      return {
        attribute: d,
        community: communityName,
        value: counts[communityName][d] || 0
      };
    });
  })
  .enter()
  .append('rect')
  .attr('x', function (d) {
    return xScale(d.attribute); // Add half of the gap to the x-coordinate
  })
  .attr('y', function (d) {
    return yScale(d.community); // Add half of the gap to the y-coordinate
  })
  .attr('width', xScale.bandwidth() - 7) // Subtract the gap from the width
  .attr('height', yScale.bandwidth() - 7) // Subtract the gap from the height
  .style('rx', 3)
  .style('ry', 3)
  .style('fill', function (d) {
    return colorScale(d.value);
  });

  // Add community labels
svg
.selectAll('.community-label')
.data(communitiesOfFocus)
.enter()
.append('foreignObject')
.attr('class', 'community-label')
.attr('x', -margin.left)
.attr('y', function (d) {
  return yScale(d);
})
.attr('width', margin.left)
.attr('height', yScale.bandwidth())
.html(function (d) {
  return `<div class="label-container"><span>${d}</span></div>`;
});

// Add attribute labels
svg
.selectAll('.attribute-label')
.data(scalarAttributes)
.enter()
.append('foreignObject')
.attr('class', 'attribute-label')
.attr('x', function (d) {
  return xScale(d);
})
.attr('y', -margin.top)
.attr('width', xScale.bandwidth())
.attr('height', margin.top)
.html(function (d) {
  return `<div class="label-container"><span>${d}</span></div>`;
});


    return () => {
      d3.select(svgRef.current).selectAll('svg').remove();
    };
  }, [counts]);

  return <div id="heatmap" ref={svgRef}></div>;
}

export default Heatmap;

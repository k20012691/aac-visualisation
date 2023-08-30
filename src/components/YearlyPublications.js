import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function YearlyPublications(props) {
    const database = props.database;

    function getYearsCount() {
        var counts = {};
        for (var paper in database) {
            const year = database[paper]['Year']
            if (year !== undefined) {
                if (!counts[year]) {
                    counts[year] = 0
                }
                counts[year] += 1
            }
        }
        return counts;
    }

    const height = 270;
    const width = 580;
    const margin = 20;

    const svgRef = useRef(null);

    useEffect(() => {
        const svgContainer = svgRef.current;
        d3.select(svgContainer).selectAll('*').remove();

        const customTickFormat = (d) => {
            const lastTwoDigits = d.toString().slice(-2);
            return `'${lastTwoDigits}`;
          };

        const svg = d3.select('#bar-chart')
            .append('svg')
            .attr('width', width + margin / 2)
            .attr('height', height + margin / 2)
            .attr('viewBox', `0 0 ${width + margin * 12} ${height}`)
            .append('g')
            .attr('transform', `translate(${margin},${margin})`);

        const yearsCount = getYearsCount();
        const dataArr = Object.entries(yearsCount).map(([year, count]) => ({ year, count }));

        const x = d3.scaleBand()
        .domain(dataArr.map(d => d.year))
        .range([0, width + 200])
        .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(dataArr, d => d.count)])
            .nice()
            .range([height, 0]);

        svg.selectAll('.bar')
            .data(dataArr)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.year))
            .attr('y', d => y(d.count))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.count))
            .style('rx', 2)
            .style('fill', '#6148FF');

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(customTickFormat))
            .style('font-family', 'Inter');
        
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y))
            .style('font-family', 'Inter');

        svg.selectAll('.x-axis line')
            .style('display', 'none');

        svg.selectAll('.y-axis line')
            .style('display', 'none');
    }, [database])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div id='bar-chart' ref={svgRef} />
        <span style={{ fontWeight: 500, fontSize: '1.25em', alignItems: 'flex-start' }}>AAC Research Publications from 1978-2021</span>
    </div>
  )
}

export default YearlyPublications
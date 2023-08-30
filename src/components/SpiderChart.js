import { useEffect, useRef } from 'react';
import React from 'react';
import * as d3 from 'd3';

function SpiderChart(props) {
  const labels = props.labels;
  const data = props.data;
  const id = props.id;

  const height = 200;
  const width = 200;
  const margin = 14;
  const svgId = `spider-chart-${id}`;
  const chartRef = useRef(null);

  let radialScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([0, 70]);
  let ticks = d3.ticks(0, Math.max(...data), 5);

  let angleScale = d3.scaleLinear().domain([0, labels.length]).range([0, 2 * Math.PI]);

  useEffect(() => {
    drawChart();
  }, [data, labels]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('circle').data(ticks).join(
      enter => enter.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('stroke', '#A9A9A9')
        .attr('fill', 'none')
        .attr('r', d => radialScale(d))
    );

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const line = d3.lineRadial()
      .angle((d, i) => angleScale(i))
      .radius(d => radialScale(d))
      .curve(d3.curveLinearClosed);

      g.selectAll('.axis-label')
      .data(labels)
      .enter()
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', (d, i) => (radialScale(Math.max(...data)) + margin) * Math.sin(angleScale(i)))
      .attr('y', (d, i) => -(radialScale(Math.max(...data)) + margin) * Math.cos(angleScale(i)))
      .text(d => {
        if (d.length <= 3) {
          return d
        }
        else {
          return d.substring(0, 3) + "."
        }
      })
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('font-family', 'Inter')
      .style('font-weight', 300)
      .style('font-size', calculateFontSize);

    g.selectAll('.axis')
      .data(labels)
      .enter()
      .append('line')
      .attr('class', 'axis')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radialScale(Math.max(...data)) * Math.sin(angleScale(i)))
      .attr('y2', (d, i) => -radialScale(Math.max(...data)) * Math.cos(angleScale(i)))
      .attr('stroke', '#A9A9A9');

    g.append('path')
      .datum(data)
      .attr('d', line)
      .attr('stroke-width', 3)
      .attr('fill', '#BAF3FF')
      .attr('fill-opacity', 0.5)
      .style('stroke-linejoin', 'round')
      .attr('stroke', '#0092B2');
    
  };

  const calculateFontSize = (d, i, nodes) => {
    const containerWidth = width - margin * 2;
    const containerHeight = height - margin * 2;
    const labelWidth = nodes[i].getBBox().width;
    const labelHeight = nodes[i].getBBox().height;
    const widthRatio = containerWidth / labelWidth;
    const heightRatio = containerHeight / labelHeight;
    const scaleRatio = Math.min(widthRatio, heightRatio, 1);
    const fontSize = scaleRatio * 10;
    return `${fontSize}px`;
  };

  return <svg id={svgId} ref={chartRef} />;
}

export default SpiderChart;
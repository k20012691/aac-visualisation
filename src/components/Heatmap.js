import React, { useEffect } from 'react'
import { csv } from 'd3-fetch'
import data from '../Data.csv'

function Heatmap() {
  useEffect(() => {
    getChartData();
    console.log(getDatasetSize());
  }, []);

  async function getChartData() {
    const CSVdata = await csv(data)
    return CSVdata;
  }

  async function getDatasetSize() {
    const CSVData = await csv(data);
    return Object.keys(CSVData).length - 1;
  }

  return (
    <div id='heatmap'>Heatmap</div>
  )
}

export default Heatmap
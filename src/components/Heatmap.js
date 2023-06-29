import React, { useEffect } from 'react'
import { csv } from 'd3-fetch'
import data from '../Data.csv'

function Heatmap() {
  useEffect(() => {
    getChartData();
  }, []);

  async function getChartData() {
    const CSVdata = await csv(data)
    console.log(CSVdata)
  }

  return (
    <div>Heatmap</div>
  )
}

export default Heatmap
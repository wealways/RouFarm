import React from 'react';
import { Dimensions } from "react-native";

import {
  BarChart,
  PieChart,
} from "react-native-chart-kit";

const minValue = 0;

function* yLabel() {
  yield* [minValue, 25, 50, 75, 100];
}

const datapoints = [20, 45, 28, 80, 99, 43].map(
  (datapoint) => datapoint - minValue - 1,
);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat', 'Sun'],
  datasets: [
    {
      data: datapoints,
    },
  ],
};


const CustomBarChart = () => {
  const width = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.4,
    useShadowColorFromDataset: false, // optional,
    formatYLabel: () => yLabelIterator.next().value,
    data: data.datasets,
    

  };
  const yLabelIterator = yLabel();


  
  return (
    <BarChart
      style={{
        marginVertical: 10,
        borderRadius: 16,
        margin:-10,
      }}
      data={data}
      width={width-80}
      height={220}
      verticalLabelRotation={0}
      chartConfig={chartConfig}
      fromZero={true}
      
    />
  )
}

export default CustomBarChart;
import "./Chart.css";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const Chart = (sparkline) => {
  const values = [];
  const names = [];

  for (let i = 0; sparkline.data.length > i; i++) {
    values.push(parseFloat(sparkline.data[i]));
    names.push(i);
  }

  const statics = {
    labels: names,
    datasets: [
      {
        data: values,
        label: "Price in USD",
        backgroundColor: "#ffdd00",
        borderColor: "#ffff00",
        fill: false,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Chart">
      <Line data={statics} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default Chart;

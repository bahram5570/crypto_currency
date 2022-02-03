import "./Chart.css";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const Chart = (sparkline) => {
  const values = [];
  const changesDate = [];

  const todayDate = new Date();

  for (let i = 0; sparkline.data.length > i; i++) {
    values.push(parseFloat(sparkline.data[i]));

    changesDate.unshift(`${todayDate.getMonth() + 1}/${todayDate.getDate()}`);
    todayDate.setDate(todayDate.getDate() - 1);
  }

  const statics = {
    labels: changesDate,
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

import React from "react";
import { Bar } from "react-chartjs-2";


function Chart({ data }) {
  const topTen = data
    .sort((a, b) => {
      return a.donate < b.donate ? 1 : -1;
    })
    .slice(0, 10);

  ////////////////////////////////BAR ChArt////////////////////////////////////////
  const users = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],

    labels: topTen.map((user) => user.first_name),
    datasets: [
      {
        label: "# of Donate",
        // data: [12, 19, 3, 5, 2, 3],
        data: topTen.map((user) => user.donate),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(155, 199, 232, 0.2)",
          "rgba(154, 162, 235, 0.2)",
          "rgba(255, 106, 186, 0.2)",
          "rgba(75, 100, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(155, 199, 232, 1)",
          "rgba(154, 162, 235, 1)",
          "rgba(255, 106, 186, 1)",
          "rgba(75, 100, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  ////////////////////////////////BAR ChArt////////////////////////////////////////

  return (
    // <Card className={classes.input}>
    <div>
      <div>
        <Bar width={10} height={7} data={users} options={options} />
      </div>
    </div>
    // </Card>
  );
}

export default Chart;

//width={10} height={10}

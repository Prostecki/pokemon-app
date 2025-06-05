export const formatPokemonChartData = (stats) => {
  return {
    labels: stats.map((stat) => stat.name),
    datasets: [
      {
        label: "Stats",
        data: stats.map((stat) => stat.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
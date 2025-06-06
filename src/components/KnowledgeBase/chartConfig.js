import { Chart } from "chart.js";

export const getPokemonBarChartOptions = () => ({
  responsive: true,
  indexAxis: "y",
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 14,
        },
        color: "#222",
        generateLabels: (chart) => {
          // Use a custom color for the legend box
          const defaultLabels =
            Chart.helpers?.legend?.generateLabels(chart) || [];
          return defaultLabels.map((label) => ({
            ...label,
            fillStyle: "#888", // gray color for legend box
            strokeStyle: "#888",
          }));
        },
      },
    },
    title: {
      display: true,
      text: "Pokemon Stats",
      font: {
        size: 24,
        weight: "bold",
      },
      color: "#222",
    },
  },
});

export const getPokemonChartOptions = (stats) => {
  return {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...stats.map((stat) => stat.value)) + 10,
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          font: {
            size: 12,
          },
        },
        pointLabels: {
          display: true,
          font: {
            size: 15,
            weight: "bold",
          },
          padding: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
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
      },
    },
  };
};

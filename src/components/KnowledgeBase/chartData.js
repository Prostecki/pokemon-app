export function formatPokemonBarChartData(stats) {
  // Define a color palette for different stats
  const colors = [
    "rgba(255, 99, 132, 0.7)", // Red
    "rgba(54, 162, 235, 0.7)", // Blue
    "rgba(255, 206, 86, 0.7)", // Yellow
    "rgba(75, 192, 192, 0.7)", // Green
    "rgba(153, 102, 255, 0.7)", // Purple
    "rgba(255, 159, 64, 0.7)", // Orange
  ];

  return {
    labels: stats.map((stat) => stat.name),
    datasets: [
      {
        label: "Base Stats",
        data: stats.map((stat) => stat.value),
        // Assign a different color to each stat
        backgroundColor: stats.map((_, i) => colors[i % colors.length]),
      },
    ],
  };
}

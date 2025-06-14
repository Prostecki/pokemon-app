import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  BarController,
} from "chart.js";
import { getPokemonBarChartOptions } from "../../../utils/charts/chartConfig";
import { formatPokemonBarChartData } from "../../../utils/charts/chartData";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  BarController
);

export default function PokemonStatsChart({ stats }) {
  const data = formatPokemonBarChartData(stats);
  const options = {
    ...getPokemonBarChartOptions(stats),
    maintainAspectRatio: false,
  };

  return (
    <div className="relative h-64 w-full">
      <Bar data={data} options={options} />
    </div>
  );
}

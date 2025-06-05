import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { getPokemonChartOptions } from "./chartConfig";
import { formatPokemonChartData } from "./chartData";

// Register required Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

export function PokemonStatsChart({ stats }) {
  const data = formatPokemonChartData(stats);
  const options = getPokemonChartOptions(stats);

  return <PolarArea data={data} options={options} />;
}

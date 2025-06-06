import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { callback, color, getHoverColor } from "chart.js/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LangDonut({ chartData }) {

    const labels = chartData.map(item => item.name);
    const data = chartData.map(item => item.value);
    const total = data.reduce( (sum, val) => sum + val, 0);

    const dataConfig = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF','#FF9F40', '#B0BEC5', '#66BB6A', '#BA68C8', '#F06292'],
        borderWidth: 1,
            },
        ],
};

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 10,
            weight: '600',
            family: "'Poppins', sans-serif",
          },
          color: '#333',
          usePointStyle: true,
          pointStyle: 'circle',
        },
        title: {
          display: true,
          text: '',
          padding: {
            top: 0,
          },
      },
      },
      
      tooltip: {
        callbacks: {
          label: function(context){
            const value = context.raw;
            const percentage = ((value)/(total) * 100).toFixed(1);
            return `${value.toLocaleString()} bytes (${percentage}%)`;
          },
        },
      },
    },
  };
    

return (
    <div className="w-60 h-74 flex flex-col justify-center items-center bg-white rounded-xl shadow-md ml-6 mr-2 my-3 pb-2">
        <h2 className="py-4 font-semibold">Top Languages</h2>
        <Doughnut data={dataConfig} options={options}></Doughnut>
    </div>
)


}
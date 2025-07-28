// PieChart.tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      plotBorderWidth: undefined,
      plotShadow: false,
    },
    title: {
      text: 'Browser market shares in March, 2022',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        type: 'pie', // 👈 Must set this when using TypeScript
        data: [
          { name: 'Chrome', y: 74.77, sliced: true, selected: true },
          { name: 'Edge', y: 12.82 },
          { name: 'Firefox', y: 4.63, showInLegend: false },
          { name: 'Safari', y: 2.44, showInLegend: false },
          { name: 'Internet Explorer', y: 2.02, showInLegend: false },
          { name: 'Other', y: 3.28 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;

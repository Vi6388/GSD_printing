// ** React Imports
import { useEffect, useState } from 'react';

// ** Third Party Components
import axios from 'axios';
import { Package } from 'react-feather';

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart';

const OrdersReceived = ({ kFormatter, warning }) => {
  // ** State
  const [data, setData] = useState(null);

  const options = {
    chart: {
      id: 'revenue',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      show: false
    },
    colors: [warning],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },

    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
  };

  useEffect(() => {
    axios.get('/card/card-statistics/orders').then((res) => setData(res.data));
    return () => setData(null);
  }, []);

  return data !== null ? (
    <StatsWithAreaChart
      icon={<Package size={21} />}
      color="warning"
      stats={kFormatter(0)}
      statTitle="Orders Received"
      options={options}
      series={data.series}
      type="area"
    />
  ) : null;
};
export default OrdersReceived;

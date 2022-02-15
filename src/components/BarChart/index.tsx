import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { BASE_URL } from '../../utils/requests';

type SeriesData = {
    name: string;
    data: number[];
};

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
};

const BarChart = (props: any) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: [],
        },
        series: [
            {
                name: '',
                data: [],
            },
        ],
    });

    useEffect(() => {
        axios
            .get(`${BASE_URL}/qtd-crimes-sexo-ano?ano=${props.ano}`)
            .then((response) => {
                const data = response.data;
                const myLabels = data.map((x: any) => x.sexo);
                const mySeries = data.map((x: any) => x.quantidade);
                setChartData({
                    labels: {
                        categories: myLabels,
                    },
                    series: [
                        {
                            name: 'Quantidade',
                            data: mySeries,
                        },
                    ],
                });
            })
            .catch((err) => console.log(err));
    }, [props]);

    const options = {
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
    };

    return (
        <>
            <h1>
                {`Quantidade de crimes de Violência Doméstica por gênero cometidos em ${props.ano}`}{' '}
            </h1>
            <Chart
                options={{ ...options, xaxis: chartData.labels }}
                series={chartData.series}
                type="bar"
                height="240"
            ></Chart>
        </>
    );
};

export default BarChart;

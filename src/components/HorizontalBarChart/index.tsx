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

const HorizontalBarChart = (props: any) => {
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
            .get(`${BASE_URL}/qtd-crimes-municipio-ano?ano=${props.ano}`)
            .then((response) => {
                const data = response.data;
                const myLabels = data.map((x: any) => x.municipio);
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
        height: chartData.labels.categories.length * 20,
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
    };

    return (
        <>
            <h1>
                {`Municípios onde mais ocorreram mais Crimes de Violência Doméstica Cometidos em ${props.ano}`}{' '}
            </h1>
            <div className="graphic-container">
                <Chart
                    options={{ ...options, xaxis: chartData.labels }}
                    series={chartData.series}
                    type="bar"
                    height="5360"
                ></Chart>
            </div>
        </>
    );
};

export default HorizontalBarChart;

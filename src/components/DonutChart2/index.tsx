import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { BASE_URL } from '../../utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
};

const DonutChart2 = (props: any) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        series: [],
    });

    useEffect(() => {
        axios
            .get(`${BASE_URL}/qtd-crimes-faixa-etaria-ano?ano=${props.ano}`)
            .then((response) => {
                const data = response.data;
                const mylabels = data.map((x: any) => x.faixaetaria);
                const mySeries = data.map((x: any) => x.quantidade);

                setChartData({ labels: mylabels, series: mySeries });
            });
    }, [props]);

    const options = {
        legend: {
            show: true,
        },
    };
    return (
        <>
            <h1>
                {' '}
                {`Faixas etárias das vítimas de Crimes de Violência Doméstica no ano de ${props.ano}`}
            </h1>
            <Chart
                options={{ ...options, labels: chartData.labels }}
                series={chartData.series}
                type="donut"
                height="240"
            />
        </>
    );
};

export default DonutChart2;

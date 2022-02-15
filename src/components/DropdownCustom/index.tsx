import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import 'react-dropdown/style.css';
import { BASE_URL } from '../../utils/requests';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import DonutChart from '../DonutChart';
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import HorizontalBarChart from '../HorizontalBarChart';
import DonutChart2 from '../DonutChart2';

const DropdownCustom = (props: any) => {
    const [parametros, setParametros] = useState([]);
    const [ano, setAno] = useState(2015);

    useEffect(() => {
        axios.get(`${BASE_URL}/${props.parametro}`).then((response) => {
            setParametros(response.data);
        });
    }, []);

    function setarAno(parametroAno: any) {
        setAno(parametroAno);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div>
                        <h1>Selecione o ano das ocorrências:</h1>
                        <DropdownButton
                            className="col-md-6"
                            id=""
                            title={`Ano`}
                        >
                            {parametros.map((parametro) => (
                                <Dropdown.Item
                                    onClick={() => setarAno(parametro)}
                                >
                                    {parametro}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>

                    <div>
                        <div className="container">
                            <br />
                            <br />
                            <DonutChart ano={ano} />
                            <br />
                            <br />
                            <br />
                            <BarChart ano={ano} />
                            <br />
                            <br />
                            <br />
                            <PieChart ano={ano} />
                            <br />
                            <br />
                            <br />
                            <HorizontalBarChart ano={ano} />
                            <br />
                            <br />
                            <br />
                            <DonutChart2 ano={ano} />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DropdownCustom;

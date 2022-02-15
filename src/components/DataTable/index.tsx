import axios from 'axios';
import { useEffect, useState } from 'react';
import { Crime } from '../../types/crime';
import { formatLocalDate } from '../../utils/format';
import { BASE_URL } from '../../utils/requests';

const DataTable = () => {
    const [crimes, setCrimes] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/dez-ultimos-crimes`)
            .then((response) => {
                setCrimes(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1>
                Dez mais recentes Crimes de Violência Doméstica no Estado de
                Pernambuco
            </h1>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>MUNICÍPIO</th>
                            <th>REGIÃO</th>
                            <th>NATUREZA</th>
                            <th>DATA</th>
                            <th>ANO</th>
                            <th>SEXO</th>
                            <th>FAIXA ETÁRIA</th>
                            <th>TOTAL DE ENVOLVIDOS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crimes.map((item: Crime) => (
                            <tr key={item.id}>
                                <td> {item.municipioDoFato} </td>
                                <td> {item.regiaoGeografica} </td>
                                <td> {item.natureza} </td>
                                <td>
                                    {formatLocalDate(
                                        item.dataDoFato,
                                        'dd/MM/yyyy'
                                    )}
                                </td>
                                <td>{item.ano}</td>
                                <td>{item.sexo}</td>
                                <td>{item.faixaEtaria}</td>
                                <td>{item.totalDeEnvolvidos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DataTable;

import DropdownCustom from './components/DropdownCustom';
import './App.css';
import DataTable from './components/DataTable';
import BarChart2 from './components/BarChart2';

function App() {
    return (
        <>
            <div className="container">
                <DataTable />
                <br />
                <BarChart2 />
                <br />
                <br />
            </div>
            <div className="justify-content-center">
                <DropdownCustom parametro={'anos'} />
            </div>
        </>
    );
}

export default App;

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.css";

const defaultColDef = { 
  sortable: true,
  filter: 'agNumberColumnFilter',
}

const columnDefs: ColDef[] = [
  { field: "designation", filter: 'agTextColumnFilter', headerName: "Designation" },
  { field: "discovery_date", filter: 'agDateColumnFilter', headerName: "Discovery Date",
    valueFormatter: (data) => {
      const date = new Date(data.value);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
      return formattedDate;
  }},
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", filter: 'agTextColumnFilter', headerName: "Potentially Hazardous",sortable: false,
    valueFormatter: (data) => {
      const newPha = data.value === 'Y' ? 'Yes' 
      : data.value === 'N' ? 'No' 
      : data.value === 'n/a' ? '' 
      : data.value;
      return newPha;
    }},
  { field: "orbit_class", filter: 'agTextColumnFilter', headerName: "Orbit Class", enableRowGroup: true, },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div className="topGrid">
        <h1 className="title">Near-Earth Object Overview</h1>
        <button className="clearFiltSort">Clear Filters and Sorters</button>
      </div>
      <AgGridReact
        rowData={data}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        enableRangeSelection={true}
      />
    </div>
  );
};

export default NeoGrid;

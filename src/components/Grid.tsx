import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "../near-earth-asteroids.json";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRef } from "react";
import { defaultColDef, columnDefs } from "../utils/GridUtils";
import "../styles/Grid.css"; 

const NeoGrid = (): JSX.Element => {
  const refGrid = useRef<AgGridReact>(null);
  const clearFiltSort = () => {
    refGrid.current?.api.setFilterModel(null);
    refGrid.current?.columnApi?.applyColumnState({
      defaultState: { sort: null },
    })
  }
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div className="topGrid">
        <h1 className="title">Near-Earth Object Overview</h1>
        <button className="clearFiltSort" onClick={clearFiltSort}>Clear Filters and Sorters</button>
      </div>
      <AgGridReact
        rowData={data}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        enableRangeSelection={true}
        ref={refGrid}
      />
    </div>
  );
};

export default NeoGrid;

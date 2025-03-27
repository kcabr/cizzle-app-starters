import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

export const Route = createFileRoute("/grid")({
  component: ShowGrid,
  head: () => ({
    title: "AI Magic Text Demo",
    meta: [
      {
        name: "description",
        content: "Test the AI magic text functionality",
      },
    ],
  }),
});

function ShowGrid() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">ag-grid Demo</h1>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        className="ag-theme-alpine"
      />
    </div>
  );
}

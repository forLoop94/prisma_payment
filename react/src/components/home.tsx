import { useState, useEffect } from "react";
import GeneratePDF from "./generatePdf";
import * as XLSX from "xlsx";

interface TableRow {
  Item: string;
  Price: string;
  Quantity: number;
}

const home = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    getTabledata();
  }, []);

  const getTabledata = async () => {
    try {
      const response = await fetch("http://localhost:5000/table-data");
      const data: TableRow[] = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    }
  };

  const handleClick = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tableData);

    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
    XLSX.writeFile(wb, "table-data.xlsx");
  };

  return (
    <div>
      <h1>PDF Generator</h1>
      <GeneratePDF
        title="Invoice #12345"
        content="Thank you for your purchase. Here are the details:"
        // imageUrl="https://cdn.pixabay.com/photo/2024/08/11/19/24/sunset-8962131_640.jpg"
        tableData={tableData}
      />
      <button onClick={handleClick}>Excel Export</button>
    </div>
  );
};

export default home;

import { useState, useEffect } from "react";
import GeneratePDF from "./generatePdf";

interface TableRow {
  item: string;
  price: string;
  quantity: number;
}

const home = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getTabledata();
  }, []);

  const getTabledata = async () => {
    try {
      const response = await fetch("http://localhost:5000/table-data");
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    }
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
    </div>
  );
};

export default home;

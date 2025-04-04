import React from "react";
import GeneratePDF from "./generatePdf";

const home = () => {
  const tableData = [
    { Item: "Laptop", Price: "$1200", Quantity: 1 },
    { Item: "Phone", Price: "$800", Quantity: 2 },
    { Item: "Headphones", Price: "$200", Quantity: 3 },
  ];
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

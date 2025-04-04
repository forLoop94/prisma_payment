import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./pdfDocument";

interface TableRow {
  [key: string]: string | number;
}

interface generatePdfProps {
  title: string;
  content: string;
  imageUrl?: string;
  tableData?: TableRow[];
}

const GeneratePDF = ({
  title,
  content,
  imageUrl,
  tableData,
}: generatePdfProps) => (
  <PDFDownloadLink
    document={
      <MyDocument
        title={title}
        content={content}
        imageUrl={imageUrl}
        tableData={tableData}
      />
    }
    fileName="book_invoice.pdf"
  >
    {({ loading }) => (
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
        }}
      >
        {loading ? "Generating PDF..." : "Download PDF"}
      </button>
    )}
  </PDFDownloadLink>
);

export default GeneratePDF;

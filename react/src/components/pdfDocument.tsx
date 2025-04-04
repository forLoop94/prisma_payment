import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface TableRow {
  [key: string]: string | number;
}

interface MyDocumentProps {
  title: string;
  content: string;
  imageUrl?: string;
  tableData?: TableRow[];
}

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  image: { width: 100, height: 100, marginBottom: 10 },
  table: {
    display: "flex",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: { flexDirection: "row" },
  tableCellHeader: {
    backgroundColor: "#f2f2f2",
    padding: 5,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
  tableCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
});

const pdfDocument = ({
  title,
  content,
  imageUrl,
  tableData,
}: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {imageUrl && (
        <View style={styles.section}>
          <Image src={imageUrl} style={styles.image} />
        </View>
      )}

      <View style={styles.section}>
        <Text>{content}</Text>
      </View>

      {tableData && tableData.length > 0 && (
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {Object.keys(tableData[0]!).map((header, index) => (
                <Text key={index} style={styles.tableCellHeader}>
                  {header}
                </Text>
              ))}
            </View>

            {tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {Object.values(row).map((cell, cellIndex) => (
                  <Text key={cellIndex} style={styles.tableCell}>
                    {String(cell)}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default pdfDocument;

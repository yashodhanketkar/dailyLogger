import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { LogType } from "../../types/logs";

const Styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "column",
    gap: 4,
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: 24,
  },
  sectionDate: {
    fontSize: 8,
  },
  sectionDescription: {
    fontSize: 16,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  header: {
    position: "absolute",
    fontSize: 12,
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export const PDFMaker = (logs: LogType[], projectName: string) => (
  <Document
    author="worklogger"
    language="English"
    title={`${projectName.split(" ").join("-")}-${new Date(
      Date.now()
    ).toISOString()}`}
  >
    <Page style={Styles.page} size="A4">
      <Text style={Styles.header} fixed>
        <Text>{projectName}</Text>
      </Text>
      {logs.map((log) => (
        <ViewFactory key={log.id} log={log} />
      ))}
      <Text
        style={Styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const ViewFactory = ({ log }: { log: LogType }) => {
  return (
    <View wrap={false} style={Styles.section}>
      <Text style={Styles.sectionTitle}>{log.task}</Text>
      <Text style={Styles.sectionDate}>
        {new Date(log.created).toTimeString().split(" ")[0]}
      </Text>
      <Text style={Styles.sectionDescription}>{log.description}</Text>
    </View>
  );
};

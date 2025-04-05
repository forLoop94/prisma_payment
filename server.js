import express from "express";
import cors from "cors";
import userRouter from "./routes/api/user.js";
import studentProfileRouter from "./routes/api/studentProfile.js";
import gradeRouter from "./routes/api/grade.js";
import studyMaterialsRouter from "./routes/api/studyMaterials.js";
import paymentsRouter from "./routes/api/payments.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5500",
    origin: "http://localhost:5173",
  })
);

const port = 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const tableData = [
  { Item: "Laptop", Price: "$1200", Quantity: 1 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
  { Item: "Laptop", Price: "$1200", Quantity: 1 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
  { Item: "Laptop", Price: "$1200", Quantity: 1 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
  { Item: "Laptop", Price: "$1200", Quantity: 78 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
  { Item: "Laptop", Price: "$1200", Quantity: 1 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
  { Item: "Laptop", Price: "$1200", Quantity: 1 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
  { Item: "Laptop", Price: "$1200", Quantity: 90 },
  { Item: "Phone", Price: "$800", Quantity: 2 },
  { Item: "Headphones", Price: "$200", Quantity: 3 },
];

app.use("/api/users", userRouter);
app.use("/api/studentProfiles", studentProfileRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/study-materials", studyMaterialsRouter);
app.use("/api/payments", paymentsRouter);
app.get("/table-data", (req, res) => {
  res.status(200).json(tableData);
});

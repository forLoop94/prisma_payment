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

app.use("/api/users", userRouter);
app.use("/api/studentProfiles", studentProfileRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/study-materials", studyMaterialsRouter);
app.use("/api/payments", paymentsRouter);

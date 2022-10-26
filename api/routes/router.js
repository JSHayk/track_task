import express from "express";
import path from "path";
import studentsRouter from "./students.router.js";

const router = express();
router.use(express.static("public"));
router.use(studentsRouter);

router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

export default router;

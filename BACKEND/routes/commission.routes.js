import express from "express";
import {
  getCommissionTables,
  createCommissionTable,
  addCommissionValue,
  generateCommissionReport,
  getReportsByAsesor,
} from "../controllers/commission.controller.js";
const router = express.Router();

router.get("/tables", getCommissionTables);
router.post("/tables", createCommissionTable);
router.post("/values", addCommissionValue);
router.post("/reports", generateCommissionReport);
router.get("/reports/:id", getReportsByAsesor);

export default router;

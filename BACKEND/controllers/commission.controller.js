import { CommissionTable, CommissionValue, CommissionReport, User } from "../models/index.js";

export const getCommissionTables = async (_, res) => {
  const tables = await CommissionTable.findAll({ include: CommissionValue });
  res.json(tables);
};

export const createCommissionTable = async (req, res) => {
  try {
    const table = await CommissionTable.create(req.body);
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addCommissionValue = async (req, res) => {
  try {
    const value = await CommissionValue.create(req.body);
    res.status(201).json(value);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const generateCommissionReport = async (req, res) => {
  const { asesorId, mes, año, tablaAplicada, totalVehiculos, totalComision, pdfUrl } = req.body;
  try {
    const report = await CommissionReport.create({ asesorId, mes, año, tablaAplicada, totalVehiculos, totalComision, pdfUrl });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReportsByAsesor = async (req, res) => {
  const { id } = req.params;
  const reports = await CommissionReport.findAll({ where: { asesorId: id }, include: User });
  res.json(reports);
};
import { response, request } from "express";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import Company from "../companies/company.model.js";

export const generateReport = async (req = request, res = response) => {
  try {
    const companies = await Company.find();
    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'No hay empresas registradas para generar reporte'
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte de Empresas");

    worksheet.columns = [
      { header: "Nombre", key: "name", width: 30 },
      { header: "Nivel de Impacto", key: "impactLevel", width: 15 },
      { header: "Años de Trayectoria", key: "years", width: 20 },
      { header: "Categoría", key: "category", width: 20 },
      { header: "Fecha de Creación", key: "createdAt", width: 20 },
    ];

    companies.forEach(company => {
      worksheet.addRow({
        name: company.name,
        impactLevel: company.impactLevel,
        years: company.years,
        category: company.category,
        createdAt: company.createdAt
      });
    });

    const folderPath = path.join(process.cwd(), "src", "excel");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, "reporte_empresas.xlsx");

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "reporte_empresas.xlsx", (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).json({
          success: false,
          msg: 'Error al enviar el reporte'
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Error al generar el reporte'
    });
  }
};

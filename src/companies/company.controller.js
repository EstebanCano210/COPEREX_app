import { response, request } from "express";
import Company from "../companies/company.model.js";

export const createCompany = async (req = request, res = response) => {
  try {
    const { name, impactLevel, years, category } = req.body;

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        msg: 'La empresa ya existe'
      });
    }

    const company = new Company({ name, impactLevel, years, category });
    await company.save();

    res.status(201).json({
      success: true,
      company
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Error al registrar la empresa'
    });
  }
};

export const getCompanies = async (req = request, res = response) => {
  try {
    const { years, category, sort } = req.query;
    let filter = {};
    
    if (years) filter.years = years;
    if (category) filter.category = category;

    let sortOption = {};
    if (sort === 'asc') sortOption.name = 1;
    else if (sort === 'desc') sortOption.name = -1;

    const companies = await Company.find(filter).sort(sortOption);
    
    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'No se encontraron empresas'
      });
    }

    res.status(200).json({
      success: true,
      companies
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener las empresas'
    });
  }
};

export const updateCompany = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { name, impactLevel, years, category } = req.body;

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        msg: 'Empresa no encontrada'
      });
    }

    if (name) company.name = name;
    if (impactLevel) company.impactLevel = impactLevel;
    if (years) company.years = years;
    if (category) company.category = category;

    await company.save();

    res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Error al actualizar la empresa'
    });
  }
};

const { Company } = require("../models/");

class CompanyController {
  static async getAllCompanies(req, res, next) {
    try {
      const data = await Company.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyById(req, res, next) {
    try {
      const { companyId } = req.params;
      const data = await Company.findByPk(companyId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async postCompanies(req, res, next) {
    try {
      const { name, companyLogo, location, email, description } = req.body;
      const authorId = req.user.id;
      console.log(authorId);

      await Company.create({ name, companyLogo, location, email, description });

      res.status(201).json({ message: "New company created successfully!" });
    } catch (error) {
      next(error);
    }
  }

  static async putCompanies(req, res, next) {
    try {
      const { name, companyLogo, location, email, description } = req.body;
      const { companyId } = req.params;

      const findCompany = await Company.findByPk(companyId);
      if (!findCompany) {
        throw { name: "company_not_found" };
      }

      await Company.update(
        { name, companyLogo, location, email, description },
        {
          where: { id: companyId },
        }
      );

      res.status(200).json({ message: `Company with id ${companyId} updated successfully!` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCompanies(req, res, next) {
    try {
      const { companyId } = req.params;

      const findCompany = await Company.findByPk(companyId);
      if (!findCompany) {
        throw { name: "company_not_found" };
      }

      await Company.destroy({ where: { id: companyId } });

      res.status(200).json({ message: `Company with id ${companyId} deleted successfully!` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CompanyController;

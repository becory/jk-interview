import { Request, Response } from "express"
import { charityService } from "../services/charity"
import { categoryService } from "../services/category"
import { regionService } from "../services/region"
import { serviceService } from "../services/service"

export const charityController = {
  // GET /charities
  getPaginated: async (req: Request, res: Response) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1)
        const limit = Math.min(100, Number(req.query.limit) || 10) // 最多100筆
        const q = req.query.q as string ?? ""
        const result = await charityService.findWithPagination(page, limit, q)
        res.json(result)
    } catch (error) {
      res.status(500).json({ message: "伺服器錯誤", error })
    }
  },

  // GET /charities/:id
  getById: async (req: Request, res: Response) => {
    try {
      const charity = await charityService.findById(Number(req.params.id))
      if (!charity) {
        return res.status(404).json({ message: "找不到該公益組織" })
      }
      res.json(charity)
    } catch (error) {
      res.status(500).json({ message: "伺服器錯誤", error })
    }
  },

  // POST /charities
  create: async (req: Request, res: Response) => {
    try {
      const category = await categoryService.getOrCreate({name: req.body['category']})
      req.body['category'] = category
      const inputRegions = req.body['regions'].split(",")
      req.body['regions'] = await Promise.all(
        inputRegions.map(inputRegion => regionService.getOrCreate({ name: inputRegion }))
      );

      const inputServices = req.body['services'].split(" ")[0].split("、")
      req.body['services'] =  await Promise.all(
        inputServices.map(inputService => serviceService.getOrCreate({name: inputService}))
      );
      console.log(req.body)
      const charity = await charityService.create(req.body)
      res.status(201).json(charity)
    } catch (error) {
      res.status(500).json({ message: "建立失敗", error })
    }
  },

  // PATCH /charities/:id
  update: async (req: Request, res: Response) => {
    try {
      const charity = await charityService.update(Number(req.params.id), req.body)
      if (!charity) {
        return res.status(404).json({ message: "找不到該公益組織" })
      }
      res.json(charity)
    } catch (error) {
      res.status(500).json({ message: "更新失敗", error })
    }
  },

  // DELETE /charities/:id
  delete: async (req: Request, res: Response) => {
    try {
      await charityService.delete(Number(req.params.id))
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: "刪除失敗", error })
    }
  },
}
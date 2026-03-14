import { AppDataSource } from "../db/data-source";
import { Charity } from "../db/entities/charity";

const charityRepo = AppDataSource.getRepository(Charity)

export const charityService = {
  findAll: async () => {
    return await charityRepo.find()
  },
  findWithPagination: async (page: number, limit: number) => {
    const [data, total] = await charityRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
      relations: ['services'] 
    })

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
        data: data
      }
  },
  findById: async (id: number) => {
    return await charityRepo.findOneBy({ id })
  },

  create: async (data: Partial<Charity>) => {
    const charity = charityRepo.create(data)
    return await charityRepo.save(charity)
  },

  update: async (id: number, data: Partial<Charity>) => {
    await charityRepo.update(id, data)
    return await charityRepo.findOneBy({ id })
  },

  delete: async (id: number) => {
    return await charityRepo.delete(id)
  },
}
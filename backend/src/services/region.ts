import { AppDataSource } from "../db/data-source";
import { Region } from "../db/entities/region";

const regionRepo = AppDataSource.getRepository(Region)

export const regionService = {
  findAll: async () => {
    return await regionRepo.find()
  },
  findWithPagination: async (page: number, limit: number) => {
    const [data, total] = await regionRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
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
  getOrCreate: async (data: Partial<Region>)=>{
      let region = await regionRepo.findOneBy({name: data.name})
      if(!region){
          region = regionRepo.create(data)
          return await regionRepo.save(region)
      }
      return region
  },
  findById: async (id: number) => {
    return await regionRepo.findOneBy({ id })
  },

  create: async (data: Partial<Region>) => {
    const region = regionRepo.create(data)
    return await regionRepo.save(region)
  },

  update: async (id: number, data: Partial<Region>) => {
    await regionRepo.update(id, data)
    return await regionRepo.findOneBy({ id })
  },

  delete: async (id: number) => {
    return await regionRepo.delete(id)
  },
}
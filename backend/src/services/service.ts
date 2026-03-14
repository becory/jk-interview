import { AppDataSource } from "../db/data-source";
import { Service } from "../db/entities/service";

const serviceRepo = AppDataSource.getRepository(Service)

export const serviceService = {
  findAll: async () => {
    return await serviceRepo.find()
  },
  findWithPagination: async (page: number, limit: number) => {
    const [data, total] = await serviceRepo.findAndCount({
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
  getOrCreate: async (data: Partial<Service>)=>{
      let service = await serviceRepo.findOneBy({name: data.name})
      if(!service){
          service = serviceRepo.create(data)
          return await serviceRepo.save(service)
      }
      return service
  },
  findById: async (id: number) => {
    return await serviceRepo.findOneBy({ id })
  },

  create: async (data: Partial<Service>) => {
    const service = serviceRepo.create(data)
    return await serviceRepo.save(service)
  },

  update: async (id: number, data: Partial<Service>) => {
    await serviceRepo.update(id, data)
    return await serviceRepo.findOneBy({ id })
  },

  delete: async (id: number) => {
    return await serviceRepo.delete(id)
  },
}
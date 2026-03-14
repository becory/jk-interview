import { AppDataSource } from "../db/data-source";
import { Category } from "../db/entities/category";

const categoryRepo = AppDataSource.getRepository(Category)

export const categoryService = {
  findAll: async () => {
    return await categoryRepo.find()
  },
  findWithPagination: async (page: number, limit: number) => {
    const [data, total] = await categoryRepo.findAndCount({
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
  getOrCreate: async (data: Partial<Category>)=>{
    let category = await categoryRepo.findOneBy({name: data.name})
    if(!category){
        category = categoryRepo.create(data)
        return await categoryRepo.save(category)
    }
    return category
  },
  findById: async (id: number) => {
    return await categoryRepo.findOneBy({ id })
  },

  create: async (data: Partial<Category>) => {
    const category = categoryRepo.create(data)
    return await categoryRepo.save(category)
  },

  update: async (id: number, data: Partial<Category>) => {
    await categoryRepo.update(id, data)
    return await categoryRepo.findOneBy({ id })
  },

  delete: async (id: number) => {
    return await categoryRepo.delete(id)
  },
}
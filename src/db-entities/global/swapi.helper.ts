import { Repository } from "typeorm"
import { SwapiEntity } from "./dto/swapi.entity"


export async function getEntity(repository: Repository<SwapiEntity>, query: string[] | string): (Promise<(SwapiEntity | null | undefined)[] | SwapiEntity | null | undefined>) {
  if (typeof query === "string") {
    if (!query) {
      return undefined
    }
    const data = await repository.findOne({
      where: [{ name: query }, { url: query }]
    })
    return data

  } else if (Array.isArray(query)) {
    return Promise.all(query.map(async (name: string) => {
      if (!name) {
        return undefined
      }
      const data = await repository.findOne({
        where: [{ name: name }, { url: name }]
      })
      return data
    }))
  }
}



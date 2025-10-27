import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository } from "typeorm";
import { https } from "follow-redirects";
import { User } from "../users/entities/user.entity";
import { VehiclesService } from "src/db-entities/vehicles/vehicles.service";
import { PeopleService } from "src/db-entities/people/people.service";
import { PlanetsService } from "src/db-entities/planets/planets.service";
import { SpeciesService } from "src/db-entities/species/species.service";
import { StarshipsService } from "src/db-entities/starships/starships.service";
import { FilmsService } from "src/db-entities/films/films.service";


@Injectable()
export class DataLoaderService implements OnApplicationBootstrap {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly peopleService: PeopleService,
    private readonly planetsService: PlanetsService,
    private readonly speciesService: SpeciesService,
    private readonly starshipsService: StarshipsService,
    private readonly filmsService: FilmsService,


    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'development') {
      await this.loadAllData()
    }
  }

  agent = new https.Agent({
    rejectUnauthorized: false
  })

  async loadAllData() {
    const entities = {
      Vehicle: {
        url: 'https://swapi.dev/api/vehicles',
        service: this.vehiclesService
      },
      Film: {
        url: 'https://swapi.dev/api/films/?page=1',
        service: this.filmsService
      },
      Starship: {
        url: 'https://swapi.dev/api/starships/?page=1',
        service: this.starshipsService
      },
      Planet: {
        url: 'https://swapi.dev/api/planets/?page=1',
        service: this.planetsService
      },
      Person: {
        url: 'https://swapi.dev/api/people/?page=1',
        service: this.peopleService
      },
      Specie: {
        url: 'https://swapi.dev/api/species/?page=1',
        service: this.speciesService
      }
    }

    for (const [_, value] of Object.entries(entities)) {
      await this.loadEntities(value.url, value.service)
    }

    if (process.env.NODE_ENV === 'development') {
      const admin = new User()
      Object.assign(admin, { name: "string", password: "string", email: "string", role: "ADMIN" })
      await this.userRepository.save(admin)
    }
  }


  async loadEntities(url: string, service: any) {
    const entities = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    await Promise.all(entities.results.map((data: any) => {
      service.create(data)
    }))
    if (entities.next) {
      this.loadEntities(entities.next, service)
    }
  }
}


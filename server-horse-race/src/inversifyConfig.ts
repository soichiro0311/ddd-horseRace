import { Container } from "inversify";
import { TYPES } from "./types";
import process from "process";
import { RaceRepositoryInterface } from "./domain/Race";
import { RaceRepository } from "./repository/RaceRepository";
import { RaceRepositoryMock } from "./repository/mocks/RaceRepositoryMock";

const myContainer = new Container();

myContainer
  .bind<RaceRepositoryInterface>(TYPES.RaceRepository)
  .to(process.env.NODE_ENV === "test" ? RaceRepositoryMock : RaceRepository)
  .inSingletonScope();

export { myContainer };

import { Container } from "inversify";
import { RaceTrackRepository } from "./repository/RaceTrackRepository";
import { TYPES } from "./types";
import process from "process";
import { RaceTrackRepositoryMock } from "./repository/mocks/RaceTrackRepositoryMock";
import { RaceTrackRepositoryInterface } from "./domain/RaceTrack";

const myContainer = new Container();

myContainer
  .bind<RaceTrackRepositoryInterface>(TYPES.RaceTrackRepository)
  .to(
    process.env.NODE_ENV === "test"
      ? RaceTrackRepositoryMock
      : RaceTrackRepository
  )
  .inSingletonScope();

export { myContainer };

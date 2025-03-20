import { Container } from "inversify";
import { TYPES } from "./types";
import process from "process";
import { RaceRepositoryInterface } from "./domain/Race";
import { RaceRepository } from "./repository/RaceRepository";
import { RaceRepositoryMock } from "./repository/mocks/RaceRepositoryMock";
import { RacingTicketRepositoryInterface } from "./domain/RacingTicket";
import { RacingTicketRepository } from "./repository/RacingTicketRepository";
import { RacingTicketRepositoryMock } from "./repository/mocks/RacingTicketRepositoryMock";
import { OddsRepositoryInterface } from "./domain/interface/OddsRepository";
import { OddsRepositoryMock } from "./repository/mocks/OddsRepositoryMock";
import { OddsRepository } from "./repository/OddsRepository";

const myContainer = new Container();

myContainer
  .bind<RaceRepositoryInterface>(TYPES.RaceRepository)
  .to(process.env.NODE_ENV === "test" ? RaceRepositoryMock : RaceRepository)
  .inSingletonScope();

myContainer
  .bind<RacingTicketRepositoryInterface>(TYPES.RacingTicketRepository)
  .to(
    process.env.NODE_ENV === "test"
      ? RacingTicketRepositoryMock
      : RacingTicketRepository
  )
  .inSingletonScope();

myContainer
  .bind<OddsRepositoryInterface>(TYPES.OddsRepository)
  .to(process.env.NODE_ENV === "test" ? OddsRepositoryMock : OddsRepository)
  .inSingletonScope();

export { myContainer };

import { injectable } from "inversify";
import { Race, RaceRepositoryInterface } from "../../domain/Race";

@injectable()
export class RaceRepositoryMock implements RaceRepositoryInterface {
  findBy(raceTrackName: string): Race {
    return new Race(1, raceTrackName, new Date("2025-01-01T14:10:00+09:00"));
  }
}

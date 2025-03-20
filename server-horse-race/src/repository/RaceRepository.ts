import { injectable } from "inversify";
import { Race, RaceRepositoryInterface } from "../domain/Race";

@injectable()
export class RaceRepository implements RaceRepositoryInterface {
  findBy(raceTrackName: string): Race {
    throw new Error("Method not implemented.");
  }
}

import { injectable } from "inversify";
import { RaceResultRepositoryInterface } from "../domain/interface/RaceResultRepository";
import { RaceResult } from "../domain/RaceResult";

@injectable()
export class RaceResultRepository implements RaceResultRepositoryInterface {
  findByRaceId(raceId: string): RaceResult {
    throw new Error("Method not implemented.");
  }
}

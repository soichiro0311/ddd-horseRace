import { injectable } from "inversify";
import { RaceResultRepositoryInterface } from "../../domain/interface/RaceResultRepository";
import { RaceResult } from "../../domain/RaceResult";

@injectable()
export class RaceResultRepositoryMock implements RaceResultRepositoryInterface {
  private receResults: { [key: string]: RaceResult } = {};

  findByRaceId(raceId: string): RaceResult {
    const key = raceId;
    return this.receResults[key];
  }

  setRaceResult(raceResults: RaceResult[]) {
    raceResults.forEach((result) => {
      this.receResults[result.raceId()] = result;
    });
  }
}

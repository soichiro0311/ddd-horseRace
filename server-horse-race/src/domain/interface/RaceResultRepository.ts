import { RaceResult } from "../RaceResult";

export interface RaceResultRepositoryInterface {
  findByRaceId(raceId: string): RaceResult;
}

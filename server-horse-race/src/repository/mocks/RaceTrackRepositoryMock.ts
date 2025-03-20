import { injectable } from "inversify";
import {
  RaceTrack,
  RaceTrackRepositoryInterface,
} from "../../domain/RaceTrack";

@injectable()
export class RaceTrackRepositoryMock implements RaceTrackRepositoryInterface {
  findBy(raceTrackName: string): RaceTrack {
    return new RaceTrack(
      1,
      raceTrackName,
      new Date("2025-01-01T14:10:00+09:00")
    );
  }
}

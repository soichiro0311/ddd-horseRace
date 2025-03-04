import { injectable } from "inversify";
import {
  RaceTrack,
  RaceTrackRepositoryInterface,
} from "../../domain/RaceTrack";

@injectable()
export class RaceTrackRepositoryMock implements RaceTrackRepositoryInterface {
  findBy(raceTrackName: string): RaceTrack {
    return new RaceTrack(raceTrackName);
  }
}

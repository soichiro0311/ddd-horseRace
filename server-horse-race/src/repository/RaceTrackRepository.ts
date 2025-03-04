import { injectable } from "inversify";
import { RaceTrack, RaceTrackRepositoryInterface } from "../domain/RaceTrack";

@injectable()
export class RaceTrackRepository implements RaceTrackRepositoryInterface {
  findBy(raceTrackName: string): RaceTrack {
    throw new Error("Method not implemented.");
  }
}

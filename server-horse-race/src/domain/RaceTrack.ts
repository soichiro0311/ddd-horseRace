export class RaceTrack {
  constructor(private trackName: string) {}
}

export interface RaceTrackRepositoryInterface {
  findBy(raceTrackName: string): RaceTrack;
}

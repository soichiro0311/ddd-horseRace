import { Odds } from "../Odds";
import { RaceStyle } from "../raceStyle/RaceStyle";

export interface OddsRepositoryInterface {
  findBy(raceId: string, raceStyle: RaceStyle): Odds[];
}

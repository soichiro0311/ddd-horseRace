import { RaceStyle } from "../enum/RaceStyle";
import { Odds } from "../Odds";

export interface OddsRepositoryInterface {
  findBy(raceId: string, raceStyle: RaceStyle): Odds[];
}

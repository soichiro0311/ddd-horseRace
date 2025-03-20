import { injectable } from "inversify";
import { OddsRepositoryInterface } from "../../domain/interface/OddsRepository";
import { RaceStyle } from "../../domain/enum/RaceStyle";
import { Odds } from "../../domain/Odds";

@injectable()
export class OddsRepositoryMock implements OddsRepositoryInterface {
  findBy(raceId: string, raceStyle: RaceStyle): Odds[] {
    return [
      new Odds(raceId, raceStyle, "HORSE1", 320),
      new Odds(raceId, raceStyle, "HORSE2", 420),
      new Odds(raceId, raceStyle, "HORSE3", 520),
      new Odds(raceId, raceStyle, "HORSE4", 620),
      new Odds(raceId, raceStyle, "HORSE5", 720),
      new Odds(raceId, raceStyle, "HORSE6", 820),
    ];
  }
}

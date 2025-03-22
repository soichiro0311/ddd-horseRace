import { injectable } from "inversify";
import { OddsRepositoryInterface } from "../../domain/interface/OddsRepository";
import { Odds } from "../../domain/Odds";
import { RaceStyle } from "../../domain/raceStyle/RaceStyle";

@injectable()
export class OddsRepositoryMock implements OddsRepositoryInterface {
  private oddsList: { [key: string]: Odds[] } = {};

  findBy(raceId: string, raceStyle: RaceStyle): Odds[] {
    const key = `${raceId}-${raceStyle}`;
    return this.oddsList[key] || [];
  }

  setOdds(raceId: string, raceStyle: RaceStyle, odds: Odds[]) {
    const key = `${raceId}-${raceStyle}`;
    this.oddsList[key] = odds;
  }
}

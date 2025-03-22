import { injectable } from "inversify";
import { OddsRepositoryInterface } from "../domain/interface/OddsRepository";
import { Odds } from "../domain/Odds";
import { RaceStyle } from "../domain/raceStyle/RaceStyle";

@injectable()
export class OddsRepository implements OddsRepositoryInterface {
  findBy(raceId: string, raceStyle: RaceStyle): Odds[] {
    throw new Error("Method not implemented.");
  }
}

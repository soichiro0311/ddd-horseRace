import { injectable } from "inversify";
import {
  RacingTicket,
  RacingTicketRepositoryInterface,
} from "../../domain/RacingTicket";
import { Race } from "../../domain/Race";
import { RaceStyle } from "../../domain/enum/RaceStyle";

@injectable()
export class RacingTicketRepositoryMock
  implements RacingTicketRepositoryInterface
{
  findById(racingTicketId: string): RacingTicket {
    return new RacingTicket(
      new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00")),
      RaceStyle.TANSHO,
      100,
      "HORSE1"
    );
  }
}

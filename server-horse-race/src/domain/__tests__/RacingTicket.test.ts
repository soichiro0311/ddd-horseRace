import { describe, expect, test, vi } from "vitest";
import { RacingTicket } from "../RacingTicket";
import { Race } from "../Race";
import { DomainError } from "../error/DomainError";
import { Umaren } from "../raceStyle/Umaren";

describe("馬券", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025/1/1 14:00:00"));

  describe("様式と登録した予想着順のバリデーション", () => {
    test("様式が馬連 かつ 3着予想の馬を登録していた場合、馬券を購入できないこと", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));

      expect(
        () =>
          new RacingTicket(
            race,
            new Umaren(),
            100,
            "HORSE1",
            "HORSE2",
            "HORSE3"
          )
      ).toThrowError(
        new DomainError(
          `馬連の場合は1,2着予想の馬のみを入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}, 1着予想: HORSE1, 2着予想: HORSE2, 3着予想: HORSE3`
        )
      );
    });
    test("様式が馬連 かつ 1着予想の馬を登録していない場合、馬券を購入できないこと", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));

      expect(
        () => new RacingTicket(race, new Umaren(), 100, undefined, "HORSE2")
      ).toThrowError(
        new DomainError(
          `馬連の場合は1,2着予想の馬のみを入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}, 1着予想: undefined, 2着予想: HORSE2, 3着予想: undefined`
        )
      );
    });
    test("様式が馬連 かつ 2着予想の馬を登録していない場合、馬券を購入できないこと", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));

      expect(
        () => new RacingTicket(race, new Umaren(), 100, "HORSE1", undefined)
      ).toThrowError(
        new DomainError(
          `馬連の場合は1,2着予想の馬のみを入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}, 1着予想: HORSE1, 2着予想: undefined, 3着予想: undefined`
        )
      );
    });
  });
});

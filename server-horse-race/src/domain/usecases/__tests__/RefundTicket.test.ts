import { describe, expect, test, vi } from "vitest";
import { RefundTicket } from "../RefundTicket";
import { RacingTicketRepositoryMock } from "../../../repository/mocks/RacingTicketRepositoryMock";
import { Race } from "../../Race";
import { RacingTicket } from "../../RacingTicket";
import { DomainError } from "../../error/DomainError";
import { beforeEach } from "node:test";
import { Tansho } from "../../raceStyle/Tansho";
import { Umaren } from "../../raceStyle/Umaren";
import { RaceResultRepositoryMock } from "../../../repository/mocks/RaceResultRepositoryMock";
import { RaceResult } from "../../RaceResult";
import { TanshoOdds } from "../../odds/TanshoOdds";
import { UmarenOdds } from "../../odds/UmarenOdds";

describe("払い戻しのユースケース", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025/1/1 14:00:00"));
  let racingTicketRepositoryMock = new RacingTicketRepositoryMock();
  let raceResultRepositoryMock = new RaceResultRepositoryMock();

  beforeEach(() => {
    racingTicketRepositoryMock = new RacingTicketRepositoryMock();
    raceResultRepositoryMock = new RaceResultRepositoryMock();
  });

  describe("単勝の場合", () => {
    test("100円の単勝の馬券が的中している かつ 払い戻し金額が320円の場合、320円が払い戻されること", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
      const ticket = new RacingTicket(race, new Tansho(), 100, "HORSE1");
      racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
      const results = [
        new RaceResult(
          race.id(),
          [new TanshoOdds(320, "HORSE1")],
          "HORSE1",
          "HORSE2",
          "HORSE3"
        ),
      ];
      raceResultRepositoryMock.setRaceResult(results);
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(refundUsecase.execute(ticket.id())!.amount()).toBe(320);
    });
    test("100円の単勝の馬券が的中していない場合、的中していないため払い戻せないエラーが発生すること", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
      const ticket = new RacingTicket(race, new Tansho(), 100, "HORSE1");
      racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
      const results = [
        new RaceResult(
          race.id(),
          [new TanshoOdds(320, "HORSE2")],
          "HORSE1",
          "HORSE2",
          "HORSE3"
        ),
      ];
      raceResultRepositoryMock.setRaceResult(results);
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(() => refundUsecase.execute(ticket.id())).toThrowError(
        new DomainError(
          `対象の馬券は的中していないため、払い戻しができません。馬券の様式: 単勝, レースID: ${race.id()}, 競馬場: 大井競馬場, 1着予想: HORSE1`
        )
      );
    });
  });
  describe("馬連の場合", () => {
    test("100円の馬連の馬券が的中している(1着と2着の予想が完全一致) かつ 払い戻し金額が430円の場合、430円が払い戻されること", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
      const ticket = new RacingTicket(
        race,
        new Umaren(),
        100,
        "HORSE1",
        "HORSE2"
      );
      racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
      const results = [
        new RaceResult(
          race.id(),
          [new UmarenOdds(430, "HORSE1", "HORSE2")],
          "HORSE1",
          "HORSE2",
          "HORSE3"
        ),
      ];
      raceResultRepositoryMock.setRaceResult(results);
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(refundUsecase.execute(ticket.id())!.amount()).toBe(430);
    });
    test("100円の馬連の馬券が的中している(1着と2着の予想が順不同で一致) かつ 払い戻し金額が430円の場合、430円が払い戻されること", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
      const ticket = new RacingTicket(
        race,
        new Umaren(),
        100,
        "HORSE2",
        "HORSE1"
      );
      racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
      const results = [
        new RaceResult(
          race.id(),
          [new UmarenOdds(430, "HORSE1", "HORSE2")],
          "HORSE1",
          "HORSE2",
          "HORSE3"
        ),
      ];
      raceResultRepositoryMock.setRaceResult(results);
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(refundUsecase.execute(ticket.id())!.amount()).toBe(430);
    });
    test("100円の馬連の馬券が的中していない場合、的中していないため払い戻せないエラーが発生すること", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
      const ticket = new RacingTicket(
        race,
        new Umaren(),
        100,
        "HORSE3",
        "HORSE2"
      );
      racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
      const results = [
        new RaceResult(
          race.id(),
          [new UmarenOdds(430, "HORSE1", "HORSE2")],
          "HORSE1",
          "HORSE2",
          "HORSE3"
        ),
      ];
      raceResultRepositoryMock.setRaceResult(results);
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(() => refundUsecase.execute(ticket.id())).toThrowError(
        new DomainError(
          `対象の馬券は的中していないため、払い戻しができません。馬券の様式: 馬連, レースID: ${race.id()}, 競馬場: 大井競馬場, 1着予想: HORSE3, 2着予想: HORSE2`
        )
      );
    });
  });
  describe("様式共通", () => {
    test("馬券が見つからない場合、払い戻しはundefined", () => {
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(() => refundUsecase.execute("RACE_TICKET1")).toThrowError(
        DomainError
      );
    });

    test("オッズが見つからない場合、エラーが発生する", () => {
      const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
      const ticket = new RacingTicket(race, new Tansho(), 100, "HORSE1");
      racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
      const refundUsecase = new RefundTicket(
        racingTicketRepositoryMock,
        raceResultRepositoryMock
      );
      expect(() => refundUsecase.execute(ticket.id())).toThrowError(
        new DomainError(
          `対象のレースと様式のオッズが登録されていません。レースID: ${race.id()}, 様式: ${new Tansho()}`
        )
      );
    });
  });
});

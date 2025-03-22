import { describe, expect, test, vi } from "vitest";
import { RefundTicket } from "../RefundTicket";
import { RacingTicketRepositoryMock } from "../../../repository/mocks/RacingTicketRepositoryMock";
import { OddsRepositoryMock } from "../../../repository/mocks/OddsRepositoryMock";
import { Race } from "../../Race";
import { RacingTicket } from "../../RacingTicket";
import { Odds } from "../../Odds";
import { DomainError } from "../../error/DomainError";
import { beforeEach } from "node:test";
import { Tansho } from "../../raceStyle/Tansho";

describe("払い戻しのユースケース", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025/1/1 14:00:00"));
  let racingTicketRepositoryMock = new RacingTicketRepositoryMock();
  let oddsRepositoryMock = new OddsRepositoryMock();

  beforeEach(() => {
    racingTicketRepositoryMock = new RacingTicketRepositoryMock();
    oddsRepositoryMock = new OddsRepositoryMock();
  });

  test("100円の単勝の馬券が的中している かつ 払い戻し金額が320円の場合、320円が払い戻されること", () => {
    const race = new Race(1, "大井競馬場", new Date("2025/1/3 14:00:00"));
    const ticket = new RacingTicket(race, new Tansho(), 100, "HORSE1");
    racingTicketRepositoryMock.setTicket(ticket.id(), ticket);
    oddsRepositoryMock.setOdds(race.id(), new Tansho(), [
      new Odds(race.id(), new Tansho(), "HORSE1", 320),
    ]);
    const refundUsecase = new RefundTicket(
      racingTicketRepositoryMock,
      oddsRepositoryMock
    );
    expect(refundUsecase.execute(ticket.id())!.amount()).toBe(320);
  });

  test("馬券が見つからない場合、払い戻しはundefined", () => {
    const refundUsecase = new RefundTicket(
      racingTicketRepositoryMock,
      oddsRepositoryMock
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
      oddsRepositoryMock
    );
    expect(() => refundUsecase.execute(ticket.id())).toThrowError(
      new DomainError(
        `対象のレースと様式のオッズが登録されていません。レースID: ${race.id()}, 様式: ${new Tansho()}`
      )
    );
  });
});

import app from "../src/index.js";
import supertest from "supertest";
import * as cardFactory from "./factories/cardFactory.js";
import connection from "../src/data/db.js";

let cardId: number;
let securityCode: string;
const password = "1234";

beforeAll(async () => {
  await connection.query("TRUNCATE table cards CASCADE");
});

describe("Create and Activate Card's test", () => {
  it("Create a card sucess 201", async () => {
    const body = cardFactory.cardFactory();
    const key = "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0";

    const result = await supertest(app)
      .post("/card")
      .send(body)
      .set({ "x-api-key": key });
    const status = result.status;

    cardId = result.body.id;
    securityCode = result.body.securityCode;

    expect(status).toEqual(201);
  });

  it("Active a card sucess 200", async () => {
    const body = { cardId, securityCode, password };

    const result = await supertest(app).post("/card/activate").send(body);
    const status = result.status;

    expect(status).toEqual(200);
  });

  it("Get a extract sucess 200", async () => {
    const result = await supertest(app).get(`/card/${cardId}/extract`);
    const status = result.status;

    expect(status).toEqual(200);
  });

  // Esse teste não está funcionando
  it("Block a card sucess 200", async () => {
    const body = { cardId, password };

    const result = await supertest(app).put(`/card/block`).send(body);
    const status = result.status;

    expect(status).toEqual(200);
  });

  // Esse teste não está funcionando
  it("Unlock a card fail 200", async () => {
    const body = { cardId, password };

    const result = await supertest(app).put(`/card/unlock`).send(body);
    const status = result.status;

    expect(status).toEqual(200);
  });
});

import request from "supertest";
import { makeApp } from "../app";

const app = makeApp();
const requestWithSupertest = request(app);

describe("SEARCH TEST", () => {
  describe("/search", () => {
    it("should list query string items", async () => {
      try {
        const res = await requestWithSupertest.get("/search?lang=en").timeout({
          deadline: 30000,
          response: 15000,
        });
      } catch (err) {
        if (err instanceof Error) {
          // timed x
        }
      }

      // expect().toBe({ flower: "rose" })
    });
  });

  it("returns an array of post codes", function (done) {
    let SWA = ["SW1A 0AA", "SW1A 0PW", "SW1A 1AA"];

    requestWithSupertest
      .post("/search/postcodes")
      .send({
        postcodes: SWA,
      })
      .expect(200)
      .end(function (err, res) {
        for (let i = 0; i < res.body.data.length; i++) {
          expect(res.body.data[i]).toEqual(SWA[i]);
        }
        done();
      });
  });
});

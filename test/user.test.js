import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "Habib",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "Habib",
      password: "rahasia",
      name: "Muhammad Habib",
    });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Habib");
    expect(result.body.data.name).toBe("Muhammad Habib");
    expect(result.body.data.password).toBeUndefined();
  });
});

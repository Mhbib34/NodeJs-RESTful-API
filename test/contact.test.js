import supertest from "supertest";
import {
  createTestUser,
  removeAllTestContacts,
  removeTestUser,
} from "./test.util";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        phone: "080908090809",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("080908090809");
  });
});

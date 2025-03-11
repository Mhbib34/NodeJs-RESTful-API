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

  it("Should reject if request is not invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "test",
        email: "test@gmail.com",
        phone: "0809080908091231313132131231",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

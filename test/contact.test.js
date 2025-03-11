import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
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

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can get contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe(testContact.firstName);
    expect(result.body.data.lastName).toBe(testContact.lastName);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("Should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can update existing contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        firstName: "Muhammad",
        lastName: "Habib",
        email: "Habib@gmail.com",
        phone: "080812342111",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe("Muhammad");
    expect(result.body.data.lastName).toBe("Habib");
    expect(result.body.data.email).toBe("Habib@gmail.com");
    expect(result.body.data.phone).toBe("080812342111");
  });

  it("Should reject if request is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "Habib",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("Should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test")
      .send({
        firstName: "Muhammad",
        lastName: "Habib",
        email: "Habib@gmail.com",
        phone: "080812342111",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

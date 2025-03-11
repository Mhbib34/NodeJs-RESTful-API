import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContacts,
  removeTestUser,
  createTestManyContacts,
} from "./test.util";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

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

describe("DELETE /api/contacts/contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("Should can't delete if contact is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestManyContacts();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can search without params", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });

  it("should can search using phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "0809080908091",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });
});

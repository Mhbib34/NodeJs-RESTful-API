import supertest from "supertest";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddress,
  removeAllTestContacts,
  removeTestUser,
} from "./test.util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can create new address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "indonesia",
        postal_code: "21212",
      });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("21212");
  });

  it("Should reject if address request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: "",
      });
    logger.info(result.body);
    expect(result.status).toBe(400);
  });

  it("Should reject if contact address is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id + 1}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "indonesia",
        postal_code: "21212",
      });
    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if address request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: "",
      });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContacts();
    await removeTestUser();
  });
  it("Should can get address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("21212");
  });

  it("Should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("Should can update Address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "provinsi test baru",
        country: "indonesia baru",
        postal_code: "121212",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("jalan test baru");
    expect(result.body.data.city).toBe("kota test baru");
    expect(result.body.data.province).toBe("provinsi test baru");
    expect(result.body.data.country).toBe("indonesia baru");
    expect(result.body.data.postal_code).toBe("121212");
  });

  it("Should reject if request address is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "provinsi test baru",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "provinsi test baru",
        country: "indonesia baru",
        postal_code: "121212",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("Should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "provinsi test baru",
        country: "indonesia baru",
        postal_code: "121212",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

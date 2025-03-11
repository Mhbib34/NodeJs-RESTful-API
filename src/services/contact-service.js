import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import validate from "../validation/validation.js";

export const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;
  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

export const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found");
  }
  return contact;
};

export const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

export const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

export const search = async (user, request) => {
  request = validate(searchContactValidation, request);
  const skip = (request.page - 1) * request.size;

  const filter = [];

  filter.push({
    username: user.username,
  });
  if (request.name) {
    filter.push({
      OR: [
        {
          firstName: {
            contains: request.name,
          },
          lastName: {
            contains: request.name,
          },
        },
      ],
    });
  }

  if (request.email) {
    filter.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filter.push({
      phone: {
        contains: request.phone,
      },
    });
  }
  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filter,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filter,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / request.size),
    },
  };
};

import { faker } from "@faker-js/faker";

import * as cryptUtils from '../utils/cryptUtils.js';
import * as employeeUtils from '../utils/employeeUtils.js'

import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js'

import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(key: string, employee: string, type: TransactionTypes) {
  await verifyApiKey(key);

  const cardholderName = employeeUtils.formatName(employee);
  const employeeId = await employeeIsValid(cardholderName, type);

  const expirationDate = generateValidDate(new Date());
  const number = faker.finance.creditCardNumber(); 

  const securityCode = faker.finance.creditCardCVV();
  const securityCodeEncrypted = cryptUtils.encryptSecurityCode(securityCode); 

  const card = cardFactory(employeeId, type, number, cardholderName, securityCodeEncrypted, expirationDate);

  const result = await cardRepository.insert(card);

  return result;
}


async function verifyApiKey(key: string) {
  if (!key) throw new Error('NoKeyProvided');

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw new Error('InvalidKey');
}

async function employeeIsValid(employee: string, type: TransactionTypes) {
  const findEmployee = await employeeRepository.findByName(employee);
  if (!findEmployee) throw new Error("InvalidEmployee");

  const findCardTypeEmployee = await cardRepository.findByTypeAndEmployeeName(
    type,
    employee
  );
  if (findCardTypeEmployee) throw new Error("EmployeeAlreadyHasCard");

  return findEmployee.id;
}

function generateValidDate(now: Date) {
  const month = now.getMonth() + 1;
  const year = now.getFullYear() + 5;
  return `${month}/${year}`;
}

function cardFactory(
  employeeId: number,
  type: TransactionTypes,
  number: string,
  cardholderName: string,
  securityCode: string,
  expirationDate: string
) {
  const card = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type,
  };

  return card;
}
import { faker } from "@faker-js/faker";

import * as cryptUtils from '../utils/cryptUtils.js';
import * as employeeUtils from '../utils/employeeUtils.js'

import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js'

import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(employee: {id: number, fullName: string}, type: TransactionTypes) {
  const employeeId = employee.id;
  const cardholderName = employeeUtils.formatName(employee.fullName);
  const typeCard = type;

  const card = cardFactory(employeeId, cardholderName, typeCard);

  await cardRepository.insert(card);
}

export async function verifyApiKey(key: string) {
  if (!key) throw { type: 'NoKeyProvided'};

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw { type: "InvalidApiKey" };

  delete company.apiKey;
  return company;
}

export async function cardIsValid(id: number){
  const card = await cardRepository.findById(id);

  if(!card) throw { type: "CardNotFound"};
  if(!checkValidDate(card.expirationDate)) throw { type: "CardExpired"};
  if(card.password) throw { type: "CardHasPassword"};

  return true;
}



function generateValidDate(now: Date) {
  const month = now.getMonth() + 1;
  const year = now.getFullYear() + 5;
  return `${month}/${year}`;
}

function checkValidDate(date: string){
  const now = new Date();
  const [month, year] = date.split('/');
  const cardMonth = parseInt(month);
  const cardYear = parseInt(year);

  if(cardYear < now.getFullYear()) return false;
  if(cardMonth < now.getMonth() + 1) return false;

  return true;
}

function cardFactory(employeeId: number, cardholderName: string, type: TransactionTypes) {
  const number = faker.finance.creditCardNumber();
  const expirationDate = generateValidDate(new Date());

  const generateCVV = faker.finance.creditCardCVV();
  const securityCode = cryptUtils.encryptSecurityCode(generateCVV);

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
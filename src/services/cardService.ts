import { faker } from "@faker-js/faker";

import * as cryptUtils from '../utils/cryptUtils.js';
import * as employeeUtils from '../utils/employeeUtils.js'

import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(employee: {id: number, fullName: string}, type: TransactionTypes) {
  const employeeId = employee.id;
  const cardholderName = employeeUtils.formatName(employee.fullName);
  const typeCard = type;

  const CVV = faker.finance.creditCardCVV();
  const card = cardFactory(employeeId, cardholderName, typeCard, CVV);

  await cardRepository.insert(card);
  return {...card, securityCode: CVV};
}

//TODO: Move to companyService
export async function verifyApiKey(key: string) {
  if (!key) throw { type: 'NoKeyProvided'};

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw { type: "InvalidApiKey" };

  delete company.apiKey;
  return company;
}

export async function cardIsValid(id: number, CVV: string) {
  const card = await getCard(id);

  if(card.password) throw { type: "CardHasPassword"};
  const verifyCVV = cryptUtils.decryptSecurityCode(card.securityCode);
  if(verifyCVV !== CVV) throw { type: "InvalidCVV"};

  return true;
}

export async function blockCard(id: number){
  const isBlocked = true;
  await cardRepository.update(id, { isBlocked });
}

export async function unlockCard(id: number) {
  const isBlocked = false;
  await cardRepository.update(id, { isBlocked });
}

export async function cardIsBlocked(id:number, password: string) {
  const card = await getCard(id);

  if (!cryptUtils.decryptPassword(password, card.password))
    throw { type: "IncorrectPassword" }; 

  return card.isBlocked;
}

export async function getExtract(idCard: number){
  const payments = await paymentRepository.findByCardId(idCard);
  const recharges = await rechargeRepository.findByCardId(idCard);

  const balance = await calculeBalance(payments, recharges);

  return { balance, transactions: payments, recharges }
}

async function calculeBalance(payments: any[], recharges: any[]) {
  let balance = 0;

  for (const payment of payments) {
    balance -= payment.amount;
  }

  for (const recharge of recharges) {
    balance += recharge.amount;
  }
  return balance;
}

async function getCard(id: number){
  const card = await cardRepository.findById(id);
  if (!card) throw { type: "CardNotFound" };

  if (!checkValidDate(card.expirationDate)) throw { type: "CardExpired" };
  return card;
}

export async function createPass(id: number, pass: string){
  const card = await cardRepository.findById(id);

  if(!card) throw { type: "CardNotFound"};
  if(card.password) throw { type: "CardHasPassword"};

  const password = cryptUtils.encryptPassword(pass);

  await cardRepository.update(id, { password });
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

function cardFactory(employeeId: number, cardholderName: string, type: TransactionTypes, generateCVV: string) {
  const number = faker.finance.creditCardNumber();
  const expirationDate = generateValidDate(new Date());

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
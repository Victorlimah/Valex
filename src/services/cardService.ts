import * as employeeUtils from '../utils/employeeUtils.js'

import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js'

export async function createCard(key: string, employee: string, type: string) {
  await verifyApiKey(key);

  const name = employeeUtils.formatName(employee);
  await employeeIsValid(name, type);

  







}


async function verifyApiKey(key: string) {
  if (!key) throw new Error('NoKeyProvided');

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw new Error('InvalidKey');
}

async function employeeIsValid(employee: string, type: string){
  const findEmployee = await employeeRepository.findByName(employee);
  if (!findEmployee) throw new Error('InvalidEmployee');

  const findCardTypeEmployee = await cardRepository.findByTypeAndEmployeeName(type, employee);
  if (findCardTypeEmployee) throw new Error('EmployeeAlreadyHasCard');
}


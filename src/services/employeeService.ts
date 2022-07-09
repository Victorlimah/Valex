
import { TransactionTypes } from '../repositories/cardRepository.js';

import * as cardRepository from '../repositories/cardRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';

export async function checkEmployeeExist(name: string){

  const employee = await employeeRepository.findByName(name);
  if (!employee) throw { message: 'EmployeeNotFound' };

  return employee;
} 

export async function checkTypeCardExist(employeeId: number, type: TransactionTypes){

  const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  if (card) throw { message: 'EmployeeAlreadyHasCard' };
}
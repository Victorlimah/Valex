import * as companyRepository from '../repositories/companyRepository.js';

export async function createCard(key: string, employee: string, type: string) {
  await verifyApiKey(key);




}


async function verifyApiKey(key: string) {
  if (!key) throw new Error('NoKeyProvided');

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw new Error('InvalidKey');
}

async function employeIsValid(employee: string): Promise<boolean> {

  return true;
}

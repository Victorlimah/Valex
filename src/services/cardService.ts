import * as companyRepository from '../repositories/companyRepository.js';

async function verifyApiKey(key: string) {
  const company = await companyRepository.findByApiKey(key);

  if (!company) throw new Error('Unauthorized');

  return company;  
}

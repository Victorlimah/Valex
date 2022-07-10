import * as companyRepository from "../repositories/companyRepository.js";

export async function verifyApiKey(key: string) {
  if (!key) throw { type: "NoKeyProvided" };

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw { type: "InvalidApiKey" };

  delete company.apiKey;
  return company;
}

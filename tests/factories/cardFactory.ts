import { faker } from "@faker-js/faker";

export function cardFactory() {
  const employee = `Fulano Rubens da Silva`;
  const index = Math.floor(Math.random() * 5);

  const types = ["groceries", "restaurant", "transport", "education", "health"];
  const type = types[index]; 

  return {
    employee,
    type,
  };
}
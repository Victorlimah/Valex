import { connection } from "../../database.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
}

export async function findById(id: number) {
  const result = await connection.query<Employee, [number]>(
    "SELECT * FROM employees WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function findByName(name: string){
    const result = await connection.query<Employee, [string]>(
      "SELECT * FROM employees WHERE fullName=$1",
      [name]
    );

    return result.rows[0];
}
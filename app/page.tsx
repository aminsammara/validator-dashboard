import { fetchValidators } from "@/lib/validators";
import { ValidatorTable } from "@/components/validator-table";

export default async function ValidatorDashboard() {
  const validators = await fetchValidators();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Validator Dashboard</h1>
      <ValidatorTable validators={validators} />
    </div>
  );
}

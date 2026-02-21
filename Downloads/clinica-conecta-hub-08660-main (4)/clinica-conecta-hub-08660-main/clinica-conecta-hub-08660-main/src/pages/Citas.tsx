import { CitaTable } from '@/components/citas/CitaTable';
import ClinicalLayout from '@/components/layouts/ClinicalLayout';

export default function Citas() {
  return (
    <ClinicalLayout>
      <div className="space-y-6 p-6">
        <CitaTable />
      </div>
    </ClinicalLayout>
  );
}

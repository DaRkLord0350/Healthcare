import db from "@/lib/db";
import React from "react";
import { MedicalHistory } from "./medical-history";

export const MedicalHistoryContainer = async ({ id, patientId }) => {
  const data = await db.medicalRecords.findMany({
    where: { patient_id: patientId },
    include: {
      diagnosis: { include: { doctor: true } },
      lab_test: true,
    },
    orderBy: { created_at: "desc" },
  });

  return (
    <>
      <MedicalHistory data={data} isShowProfile={false} />
    </>
  );
};

import { NextResponse } from 'next/server';
import { getPatientByNik, addPatientRecord } from '@/lib/patient';

export async function handler(req: Request, { params }: { params: { nik: string } }) {
  const { nik } = params;

  // Handle GET request to fetch patient by NIK
  if (req.method === 'GET') {
    try {
      const patient = await getPatientByNik(nik);
      if (!patient) {
        return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
      }
      return NextResponse.json(patient, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: 'Error fetching patient data', error: error?.message }, { status: 500 });
    }
  }

  if (req.method === 'POST') {
    try {
      const { section, data } = await req.json();
      const updatedPatient = await addPatientRecord(nik, section, data);
      return NextResponse.json(updatedPatient, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: 'Error adding record', error: error?.message }, { status: 400 });
    }
  }
  
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

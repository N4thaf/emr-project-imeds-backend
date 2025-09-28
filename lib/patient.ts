import clientPromise from './db';

export async function getPatientByNik(nik: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('pasien');
  return collection.findOne({ 'personalInfo.nik': nik });
}

export async function addPatientRecord(nik: string, section: string, data: any) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('pasien');

  const patient = await collection.findOne({ 'personalInfo.nik': nik });
  if (!patient) {
    throw new Error('Patient not found');
  }

  if (section === 'personalInfo') {
    throw new Error('Cannot modify personal info');
  }

  const update = {
    $push: { [section]: data },
  };

  await collection.updateOne({ 'personalInfo.nik': nik }, update);
  return collection.findOne({ 'personalInfo.nik': nik });
}

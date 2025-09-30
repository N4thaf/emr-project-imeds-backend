import clientPromise from "@/lib/db";
import { patient } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
  	return res.status(200).end();
  }

  const { nik } = req.query;
  const client = await clientPromise;
  const db = client.db("namanyaapa");
  const collection = db.collection("pasien");

  try {
    if (req.method === "GET") {
      const patient = await collection.findOne({ "personalInfo.nik": nik });
      if (!patient) return res.status(404).json({ message: "Patient not found" });

      return res.status(200).json(patient);
    }

    if (req.method === "POST") {
      const {
        diagnosis,
        vitals,
        labResults,
        treatments,
        consultationNotes,
        disposition
      } = req.body as patient;

      const patient = await collection.findOne({ "personalInfo.nik": nik });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      const updateObj: any = {};

      if (diagnosis) updateObj.diagnosis = { $each: [diagnosis] };
      if (vitals) updateObj.vitals = { $each: [vitals] };
      if (labResults) updateObj.labResults = { $each: [labResults] };
      if (treatments) updateObj.treatments = { $each: [treatments] };
      if (consultationNotes) updateObj.consultationNotes = { $each: [consultationNotes] };
      if (disposition) updateObj.disposition = { $each: [disposition] };

      if (!Object.keys(updateObj).length) {
        return res.status(400).json({ message: "No valid records to push" });
      }

      const result = await collection.updateOne(
        { "personalInfo.nik": nik },
        { $push: updateObj }
      );

      return res.status(200).json({ message: "Records added", result });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

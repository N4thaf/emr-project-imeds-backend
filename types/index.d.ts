export type personalInfo = {
    name: string
    nik: string
    birthDate: string
    gender: "Male" | "Female"
    address: string
    phone: string
  }
  
  export type diagnosis = {
    date: string
    diagnosis: string
    icd10: string
    doctor: string
  }
  
  export type vitals = {
    date: string
    time: string
    bp: string
    hr: string
    temp: string
    weight: string
    height: string
  }
  
  export type labResult = {
    date: string
    test: string
    result: string
    reference: string
    status: "Normal" | "Abnormal" | "High" | "Low"
  }
  
  export type treatment = {
    date: string
    medication: string
    dosage: string
    duration: string
    doctor: string
  }
  
  export type consultationNote = {
    date: string
    doctor: string
    specialty: string
    chief_complaint: string
    assessment: string
    plan: string
  }
  
  export type disposition = {
    date: string
    status: string
    instructions: string
    next_appointment: string
  }
  
  export type patient = {
    _id?: string
    personalInfo: personalInfo
    diagnosis: diagnosis[]
    vitals: vitals[]
    labResults: labResult[]
    treatments: treatment[]
    consultationNotes: consultationNote[]
    disposition: disposition[]
  }
  
  export type patientUpdateRequest = {
    diagnosis?: diagnosis[]
    vitals?: vitals[]
    labResults?: labResult[]
    treatments?: treatment[]
    consultationNotes?: consultationNote[]
    disposition?: disposition[]
  }
  
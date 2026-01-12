
import { Student, Fee } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    student_id: "SMT2024-101",
    session: "2024-25",
    class_code: "10-A",
    name: "Aarav Sharma",
    father_name: "Rajesh Sharma",
    mother_name: "Sunita Sharma",
    dob: "2008-05-12",
    gender: "Male",
    aadhaar: "1234-5678-9012",
    mobile: "9876543210",
    address: "123, Green Park, Delhi",
    photo_path: "https://picsum.photos/seed/aarav/200",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    student_id: "SMT2024-102",
    session: "2024-25",
    class_code: "10-B",
    name: "Isha Patel",
    father_name: "Vikram Patel",
    mother_name: "Meena Patel",
    dob: "2009-02-20",
    gender: "Female",
    aadhaar: "2345-6789-0123",
    mobile: "9876543211",
    address: "45, River View, Ahmedabad",
    photo_path: "https://picsum.photos/seed/isha/200",
    created_at: "2024-01-16T11:30:00Z"
  },
  {
    id: 3,
    student_id: "SMT2024-103",
    session: "2024-25",
    class_code: "09-A",
    name: "Rohan Gupta",
    father_name: "Sanjay Gupta",
    mother_name: "Ritu Gupta",
    dob: "2010-11-05",
    gender: "Male",
    aadhaar: "3456-7890-1234",
    mobile: "9876543212",
    address: "Sector 15, Chandigarh",
    photo_path: "https://picsum.photos/seed/rohan/200",
    created_at: "2024-02-01T09:15:00Z"
  }
];

export const MOCK_FEES: Fee[] = [
  {
    id: 1,
    fee_id: "FEE-001",
    studentId: 1,
    amount: 5000,
    payment_date: "2024-04-10",
    payment_mode: "UPI",
    receipt_no: "RCP-1001"
  },
  {
    id: 2,
    fee_id: "FEE-002",
    studentId: 2,
    amount: 4500,
    payment_date: "2024-04-12",
    payment_mode: "Cash",
    receipt_no: "RCP-1002"
  },
  {
    id: 3,
    fee_id: "FEE-003",
    studentId: 3,
    amount: 5000,
    payment_date: "2024-05-01",
    payment_mode: "Bank Transfer",
    receipt_no: "RCP-1003"
  },
  {
    id: 4,
    fee_id: "FEE-004",
    studentId: 1,
    amount: 2000,
    payment_date: "2024-05-15",
    payment_mode: "UPI",
    receipt_no: "RCP-1004"
  }
];

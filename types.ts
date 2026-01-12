
export interface Student {
  id: number;
  student_id: string;
  session: string;
  class_code: string;
  name: string;
  father_name: string;
  mother_name?: string;
  dob: string;
  gender: string;
  aadhaar: string;
  mobile: string;
  address: string;
  photo_path?: string;
  created_at: string;
}

export interface Fee {
  id: number;
  fee_id: string;
  studentId: number;
  amount: number;
  payment_date: string;
  payment_mode: string;
  receipt_no: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalFeesCollected: number;
  monthlyRevenue: number;
  pendingDues: number;
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  STUDENTS = 'students',
  FEES = 'fees',
  AI_INSIGHTS = 'ai-insights'
}

import api from "@/api/axios";

export interface DashboardStats {
  totalUsers: number;
  totalDocuments: number;
  totalProgrammes: number;
}

export const getDashboardStats = () =>
  api.get<DashboardStats>("/dashboard");
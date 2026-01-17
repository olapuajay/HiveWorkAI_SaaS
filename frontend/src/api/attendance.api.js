import api from "./axios";

export const clockInApi = () => api.post("/attendance/clock-in");
export const clockOutApi = () => api.post("/attendance/clock-out");
export const getMyAttendanceApi = () => api.get("/attendance/me");
export const getCompanyAttendanceApi = () => api.get("/attendance");

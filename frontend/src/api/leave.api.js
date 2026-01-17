import api from "./axios";

export const applyLeaveApi = (data) => {
  return api.post("/leaves", data);
};

export const getMyLeavesApi = (data) => {
  return api.get("/leaves/me", data);
};

export const getCompanyLeavesApi = (data) => {
  return api.get("/leaves", data);
};

export const reviewLeaveApi = (id, data) => {
  return api.put(`/leaves/${id}/review`, data);
};

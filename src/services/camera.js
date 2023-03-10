import Api from "../config/server/config";

const CameraService = {
  getAll: async (params) => {
    var data = null;
    await Api()
      .get("/api/camera/all", {params})
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  search: async (params) => {
    var data = null;
    await Api()
      .get("/api/camera", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  verifyName: async (params) => {
    var data = null;
    await Api()
      .get("/api/camera/verify-name", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  verifyUrl: async (params) => {
    var data = null;
    await Api()
      .get("/api/camera/verify-url", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  register: async (params) => {
    var data = null;
    await Api()
      .post("/api/camera/register", params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  active: async (params) => {
    var data = null;
    await Api()
      .patch(`/api/camera/${params.id}/state`, null, {
        params: { active: params.isActive },
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  update: async (params) => {
    var data = null;
    await Api()
      .put(`/api/camera/${params.id}`, params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  delete: async (params) => {
    await Api().delete(`/api/camera/${params.id}`);
  },
  verifyUsed: async (params) => {
    var data = null;
    await Api()
      .get("/api/camera/verify-used", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  generateCamera: async (params) => {
    var data = null;
    await Api()
      .post(`/api/camera/generateCamera`, null, {
        params: params
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
};

export default CameraService;

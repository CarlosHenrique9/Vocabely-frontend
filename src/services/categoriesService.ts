import api from "./api";

const categoriesService = {
  getCategories: async () => {
    const token = sessionStorage.getItem("vocabely-token");
    if (!token) {
      console.error("Token não encontrado.");
      return { status: 401, data: { message: "Não autorizado: token inválido" } };
    }
    const res = await api
      .get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error.response);
        return error.response;
      });
    return res;
  },

  getCourses: async (id: number) => {
    const token = sessionStorage.getItem("vocabely-token");
    if (!token) {
      console.error("Token não encontrado.");
      return { status: 401, data: { message: "Não autorizado: token inválido" } };
    }
    const res = await api
      .get(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {return error.response;
      });
    return res;
  }
};

export default categoriesService;

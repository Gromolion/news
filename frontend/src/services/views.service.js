import axios from "axios";
import { authHeader } from "@/helpers/auth-headers";

export const viewsService = {
  setViewed,
};

function setViewed(newsId, viewsNow, user) {
  const formData = new FormData();
  formData.set("views", viewsNow + 1);
  return axios({
    url: "/api/news/" + newsId,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: authHeader(user),
    },
  });
}

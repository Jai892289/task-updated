import axios from "axios";

export const getAllApi = () => {
    return axios.get("http://localhost:3008/")
}

export const postAllApi = (itemData) => {
    return axios.post("http://localhost:3008/register/", itemData)
}

export const updateItemApi = (itemId, itemDatas) => {
    console.log("itemId", itemId); // Corrected from "id" to "itemId"
    console.log("itemDatas", itemDatas);
    return axios.put(`http://localhost:3008/update/${itemId}`, itemDatas);
};

export const DeleteAllData = (id, mediaType) => {
    return axios.delete(`http://localhost:3008/delete/${id}/${mediaType}`);
  };
  
import * as types from "./types";

export const getAllData = () =>({
    type: types.GET_ALL_POST
})

export const getAllDataSuccess = (data) => {
    console.log("Data received:", data);

    return {
        type: types.GET_ALL_POST_SUCCESS,
        payload: data,
    };
};

export const getAllDataFailure = (error) =>({
    type: types.GET_ALL_POST_FAILURE,
    payload:error
})

export const getAllPostData = (itemData) =>({
    type: types.SEND_ALL_POST,
    payload:itemData,

})

export const getAllPostDataSuccess = (itemData) =>({
    type: types.SEND_ALL_POST_SUCCESS,
    payload:itemData,
})



export const getAllPostDataFailure = (error) =>({
    type: types.SEND_ALL_POST_FAILURE,
    payload:error
})


export const updateData = (itemId,itemDatas) => ({
    type: types.UPDATE_ITEMS_REQUEST,
    payload: {itemId, itemDatas},
})

export const updateDataSuccess = () => ({
    type: types.UPDATE_ITEMS_SUCCESS,
})

export const updateDataFailure = (error) => ({
    type: types.UPDATE_ITEMS_FAILURE,
    payload: error,
})

export const deleteData = (id, mediaType) => ({
    type: types.DELETE_ITEMS_REQUEST,
    payload: { id, mediaType },
  });
  
  export const deleteDataSuccess = (id, mediaType) => ({
    type: types.DELETE_ITEMS_SUCCESS,
    payload: { id, mediaType },
  });
  
  export const deleteDataFailure = (error) => ({
    type: types.DELETE_ITEMS_FAILURE,
    payload: error,
  });
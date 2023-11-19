import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as types from "./types";
import { getAllApi , postAllApi, updateItemApi , DeleteAllData} from './api';
import { getAllDataSuccess, getAllDataFailure , getAllPostDataSuccess,deleteDataSuccess,deleteDataFailure, getAllPostDataFailure, updateDataSuccess, updateDataFailure} from './action';

function* fetchItemsSaga() {
    try {
        const response = yield call(getAllApi);
        yield put(getAllDataSuccess(response.data));
        console.log(response)
    } catch (error) {
        yield put(getAllDataFailure(error));
    }
}

function* postItemsSaga(action) {
    console.log(action.payload)
    try {
        const response = yield call(postAllApi, action.payload);
        yield put(getAllPostDataSuccess(response.data));
        console.log(response)
    } catch (error) {
        yield put(getAllPostDataFailure(error));
    }
}
function* deleteItemsSaga(action) {
    const { id, mediaType } = action.payload;
  
    try {
      const response = yield call(DeleteAllData, id, mediaType);
      yield put(deleteDataSuccess(response.data));
      console.log(response);
    } catch (error) {
      yield put(deleteDataFailure(error));
    }
  }
  

function* updateItemsSaga(action) {
    console.log(action.payload)
    
    try {
        const response = yield call(updateItemApi, action.payload.itemId,action.payload.itemDatas);
        yield put(updateDataSuccess());
        console.log("response",response)
    } catch (error) {
        yield put(updateDataFailure(error));
    }
}

function* watchFetchItems() {
    yield takeLatest(types.GET_ALL_POST, fetchItemsSaga);
    yield takeLatest(types.SEND_ALL_POST, postItemsSaga);
    yield takeLatest(types.DELETE_ITEMS_REQUEST, deleteItemsSaga);
    yield takeLatest(types.UPDATE_ITEMS_REQUEST, updateItemsSaga);
    

}

export default function* rootSaga() {
    yield all([watchFetchItems()]);
}


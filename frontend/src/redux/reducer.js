import * as types from "./types";

const initialState = {
    items: [],
    loading: false,
    error: false
};

const itemData = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_POST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case types.GET_ALL_POST_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                error: false,
            };
        case types.GET_ALL_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case types.SEND_ALL_POST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case types.SEND_ALL_POST_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                error: false,
            };
        case types.SEND_ALL_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case types.UPDATE_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case types.UPDATE_ITEMS_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => item._id === action.payload.itemId ? action.payload.itemData : item),
                loading: false,
            };


        case types.UPDATE_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case types.DELETE_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case types.DELETE_ITEMS_SUCCESS:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item._id === action.payload.id) {
                        const updatedItem = { ...item };

                        // Remove the specified media type
                        switch (action.payload.mediaType) {
                            case 'image':
                                updatedItem.image = null;
                                break;
                            case 'video':
                                updatedItem.video = null;
                                break;
                            case 'audio':
                                updatedItem.audio = null;
                                break;
                            default:
                            // Handle other cases if needed
                        }

                        return updatedItem;
                    }
                    return item;
                }),
                loading: false,
                error: false,
            };

        case types.DELETE_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default itemData;

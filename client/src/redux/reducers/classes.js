
const initialState = {
    isLoading: false,
    loaded: false,
    data: null,
    error: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "GET_CLASSES_REQUEST":
        return {
          ...state,
          isLoading: true,
          loaded: false,
          data: null,
          error: null,
        };
      case "GET_CLASSES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          loaded: true,
          data: payload,
          error: null,
        };
      case "GET_CLASSES_FAIL":
        return {
          ...state,
          isLoading: false,
          loaded: true,
          data: null,
          error: payload,
        };
      case "SWITCH_WORKGROUP":
        return {
          ...state,
        };
      default:
        return state;
    }
  }
  
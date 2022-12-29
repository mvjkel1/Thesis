
const initialState = {
    conversations: [],
    activeUsers: [],
    messages: [],
    isLoading: false,
    loaded: false,
    error: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case 'CHAT_INIT': 
        return {
            ...state
        }
      case 'GET_CONVERSATIONS_SUCCESS':
        return {
          ...state,
          conversations: payload,
          isLoading: false,
          loaded: true,
          error: null
        };
      case 'GET_CONVERSATIONS_FAIL':
        return {
          ...state,
          isLoading: false,
          loaded: true,
          conversations: null,
          error: payload
        };
    case 'CREATE_CONVERSATION_SUCCESS':
        return {
            ...state,
            isLoading: false,
            loaded: true,
            conversations: [...state.conversations, payload[0]],
            error: null
        };
    case 'CREATE_CONVERSATION_FAIL':
        return {
            ...state,
            isLoading: false,
            loaded: true,
            error: payload
        };
      case 'MESSAGE_NOTIFICATION':
        return {
            ...state,
            isLoading: false,
            loaded: true,
            conversations: state.conversations.map(
                (conv, i) => conv._id == payload.conversationId ? {...conv, unread: true, messages: [...conv.messages, payload], notification: payload}
                                        : conv
            )
        }
        case 'CLEAR_MESSAGE_NOTIFICATION':
        return {
            ...state,
            isLoading: false,
            loaded: true,
            conversations: state.conversations.map(
                (conv, i) => conv._id == payload.conversationId ? {...conv, unread: true, messages: [...conv.messages], notification: null}
                                        : conv
            )
        }
        case 'GET_MESSAGES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                conversations: state.conversations.map(
                    (conv, i) => conv._id == payload[0]?.conversationId ? { ...conv, messages: payload}
                                            : conv
                )
            }
        case 'SEND_MESSAGE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                loaded: true,
                conversations: state.conversations.map( 
                    (conv, i) => conv._id == payload.conversationId ? { ...conv, messages: [...conv.messages, payload]}
                                            : conv
                )
            }
    case 'UPDATE_ACTIVE_USERS':
        return {
            ...state,
            isLoading: false,
            loaded: true,
            activeUsers: payload
        };
      default:
        return state;
    }
  }
  
import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from "redux";

import thunk from "redux-thunk";
import sessionReducer from "./session";
import postReducer from "./post";
import likeReducer from "./like";
import commentReducer from "./comment";
import userPostReducer from "./userPosts";

const rootReducer = combineReducers({
    session: sessionReducer,
    posts: postReducer,
    likes: likeReducer,
    comments: commentReducer,
    userPosts: userPostReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

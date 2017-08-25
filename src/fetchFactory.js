export default (name, url) => {
  return {
    selector: state => {
      if (!(state.api && state.api[name])) return null;
      return state.api[name].data;
    },
    actionCreator: () => ({ dispatch }) => {
      dispatch({
        type: '@API/START',
      });
      fetch(url)
        .then(res => res.json())
        .then(res => {
          dispatch({
            type: '@API/END',
            payload: {
              data: res,
              name,
            },
          });
        })
    },
  };
};


const reducer = (state, action) => {
  if (!action.payload) {
    return {}
  }
  const { name, data } = action.payload;
  switch (action.type) {
    case '@API/END':
      return {
        ...state,
        [name]: {
          data,
        }
      };
      break;
    default:
      return {};
  }
};

export const apiReducer = {
  api: reducer,
}

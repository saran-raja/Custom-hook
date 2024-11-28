import React, { useEffect, useReducer } from "react";
import Api from "./api";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setLoading":
      return { ...state, isLoading: true, error: null };
    case "setData":
      return { ...state, isLoading: false, data: action.value };
    case "setError":
      return { ...state, isLoading: false, error: action.value };
    default:
      return state;
  }
}
const url = {url: "https://random-word-api.herokuapp.com/word?number=10", method:"get"};
const Content = () => {
  const { data, isLoading, error, fetchData } = Api(url);
  useEffect(() => {
    fetchData();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "setLoading" });
    } else if (data) {
      dispatch({ type: "setData", value: data });
    } else if (error) {
      dispatch({ type: "setError", value: error });
    }
  }, [data, isLoading, error]);
  console.log(state);

  return (
    <div>
      <input type="text"></input>
      {state.isLoading && <p>Loading data, please wait...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.data && (
        <div>
          <ul>
            {state.data.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      )}
      <button onClick={fetchData}>click</button>
    </div>
  );
};

export default Content;

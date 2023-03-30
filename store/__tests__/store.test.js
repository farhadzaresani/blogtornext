import { createStore } from "redux";
import userReducer, { thisUser } from "../../reducers/userReducer";
import store from "../store";
import { setUser } from "../../reducers/userReducer";

describe("Redux store", () => {
  let testStore;

  beforeEach(() => {
    testStore = createStore(userReducer);
  });

  it("should set an object on the store", () => {
    const obj = { key1: "value1", key2: "value2" };
    testStore.dispatch(setUser(obj));

    expect(testStore.getState().myObject).toEqual(obj);
  });
});

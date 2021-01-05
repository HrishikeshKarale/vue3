import { GetterTree } from "vuex";
import { State } from "@/store/state";

export type Getters = {
  completedCount(state: State): number;
  totalCount(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  completedCount(state) {
    return state.list.filter(item => item.status == "completed").length;
  },
  totalCount(state) {
    return state.list.length;
  }
};

import { MutationTree } from "vuex";
import { State, ToDoList } from "./state";

export enum MutationType {
    CreateItem = "CREATE_ITEM",
    SetItems = "SET_ITEMS",
    CompleteItem = "COMPLETE_ITEM",
    SetLoading = "SET_LOADING"
};

export type Mutations = {
    [MutationType.CreateItem](state: State, item: ToDoList): void,
    [MutationType.SetItems](state: State, item: ToDoList[]): void,
    [MutationType.CompleteItem](state: State, item: Partial<ToDoList> & { id: number }): void,
    [MutationType.SetLoading](state: State, value: boolean): void
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.CreateItem](state, item) {
        //adds item to the beginning of an array
        state.list.unshift(item);
        //alternate implementation
        //state.list = [item, ...state.list];
    },
    [MutationType.SetItems](state, list) {
        state.list = list;
    },
    [MutationType.CompleteItem](state, newItem) {
        const index = state.list.findIndex(s => s.id === newItem.id);
        if (index === -1) return
        state.list[index] = { ...state.list[index], ...newItem };
    },
    [MutationType.SetLoading](state, value) {
        state.loading = value;
    }
}
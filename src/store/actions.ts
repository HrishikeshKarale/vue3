import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
    GetToDoItems = "GET_List"
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetToDoItems](Context: ActionAugments): void
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GetToDoItems]({ commit }) {
        commit(MutationType.SetLoading, true);

        await sleep(1000);

        commit(MutationType.SetLoading, false);
        commit(MutationType.SetItems, [
            {
                id: 1,
                todo: "Create an awesome Vue 3 application",
                completed: false
            }
        ])
    }
}

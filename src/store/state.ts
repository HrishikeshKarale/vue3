export type ToDoList = {
    id: number,
    todo: string,
    completed: boolean
};

export type State = {
    loading: boolean,
    list: ToDoList[]
};

export const state: State = {
    loading: false,
    list:[]
}
export type ToDoList = {
    id: number,
    todo: string,
    description: string | null,
    status: boolean,
    completed: string | null,
    tags: string[] | null
};

export type State = {
    loading: boolean,
    list: ToDoList[]
};

export const state: State = {
    loading: false,
    list: []
}
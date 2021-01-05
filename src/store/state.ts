export enum Status {
	created = "CREATED",
	active = "ACTIVE",
	limbo = "LIMBO",
	onHold = "ON_HOLD",
	complete = "COMPLETE"
}

export const statusList = [
	"created",
	"active",
	"limbo",
	"onHold",
	"complete"
]

export type ToDoList = {
	id: number;
	todo: string;
	description: string | null;
	status: string;
	completed: string | null;
	tags: string[] | null;
};

export type State = {
	loading: boolean;
	list: ToDoList[];
};

export const state: State = {
	loading: false,
	list: []
};

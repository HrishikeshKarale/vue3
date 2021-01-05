export enum Status {
	created = "CREATED",
	active = "ACTIVE",
	onHold = "ON_HOLD",
	limbo = "LIMBO",
	complete = "COMPLETE"
}

export const statusList = [
	"created",
	"active",
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

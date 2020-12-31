export const timer = {
	data() {
		const timer = 0;
		const interval = 2000;
		const func = () => { };
		return {
			timer,
			interval,
			func
		}
	},

	methods: {
		setFunc: (func: function): void => {
			this.func = func;
		}
	},

	unmounted() {
		clearInterval(this.timer);
	},

	mounted() {
		this.timer = setInterval(() => {
			this.func();
		}, this.interval);
	}
};

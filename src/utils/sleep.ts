export const sleep = async (time: number) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ success: true }), time);
	});
};

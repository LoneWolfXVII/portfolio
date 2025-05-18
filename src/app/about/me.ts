interface IProfile {
	name: string;
	title: string;
	skills: string[];
	hardWorker: boolean;
	quickLearner: boolean;
	problemSolver: boolean;
	productThinker: boolean;
	yearsOfExperience: number;
	hireable: () => boolean;
}

const profile: IProfile = {
	name: 'Nischal Gupta',
	title: 'Software Engineer | Problem Solver | Passionate about UI/UX',
	skills: [
		'ReactJS',
		'NextJS',
		'TailwindCSS',
		'TypeScript',
		'NodeJS',
		'MongoDB',
		'ThreeJs',
	],
	hardWorker: true,
	quickLearner: true,
	problemSolver: true,
	productThinker: true,
	yearsOfExperience: 3,
	hireable: function () {
		return (
			this.hardWorker &&
			this.problemSolver &&
			this.skills.length >= 5 &&
			this.yearsOfExperience >= 3 &&
			this.productThinker
		);
	},
};

export default profile;

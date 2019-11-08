export const nonUserMenu = [
	{ name: "Home", route: "/home" },
	{ name: "Login/Register", route: "/login" }
];

export const userMenu = [
	{ name: "Home", route: "/home" },
	{ name: "Projects", route: "/home", subMenu: [
		{ name: "All Projects", route: "projects" },
		{ name: "My Projects", route: "projects-user" },
		{ name: "Submit a Project", route: "project-submission" }
	]},
	{ name: "Profile", route: "profile" },
	{ name: "Logout", route: "logout" }
];

export const adminMenu = [
	{ name: "Home", route: "/home" },
	{ name: "Projects", route: "/home", subMenu: [
		{ name: "All Projects", route: "projects" },
		{ name: "My Projects", route: "projects-user" },
		{ name: "Pending Projects", route: "projects-pending" },
		{ name: "Submit a Project", route: "project-submission" }
	]},
	{ name: "Profile", route: "profile" },
	{ name: "Logout", route: "logout" }
];
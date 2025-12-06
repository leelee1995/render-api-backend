//  Render types

export type RenderServiceType =
	| "web"
	| "staticSite"
	| "privateService"
	| "postgres"
	| "redis"
	| "mysql"
	| "keyValue"
	| "cronJob";

export type RenderRegion =
	| "oregon"
	| "frankfurt"
	| "singapore"
	| "ohio"
	| "virginia";

export type RenderRuntime =
	| "docker"
	| "buildCommand"
	| "nix"
	| "node"
	| "python"
	| "ruby"
	| "go"
	| "rust"
	| "elixir"
	| "php"
	| "java";

export type RenderPlanType =
	| "free"
	| "starter"
	| "standard"
	| "team"
	| "professional"
	| "business";

export type RenderInstanceType =
	| "web"
	| "backgroundWorker"
	| "privateService"
	| "cronJob";

export interface RenderPlan {
	id: string;
	type: RenderPlanType;
	name: string;
	price: number; // monthly in USD cents
	unit: "month" | "hour";
	limit: number; // e.g., RAM limit in MB
	features?: string[]; // e.g., ['customDomain', 'autoDeploys']
}

export interface RenderRegionInfo {
	id: string;
	name: string;
	code: RenderRegion;
	country: string;
	availableForTypes: RenderServiceType[];
}

export interface RenderBranch {
	name: string;
	ref: string;
}

export interface RenderEnvVar {
	key: string;
	value: string;
	scope: "service" | "environmentGroup";
}

export interface RenderService {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	serviceType: RenderServiceType;
	ownerId: string;
	ownerType: "user" | "team";

	// Common fields
	runtime: RenderRuntime;
	region: RenderRegion;
	plan: RenderPlan;
	branch: RenderBranch;
	rootDirectory: string;
	buildCommand: string;
	startCommand: string;
	envVars: RenderEnvVar[];
	envVarsPath: string; // .env file path
	autoDeploy: boolean;
	autoDeployPaused?: boolean;

	// URLs and domains
	url: string; // e.g., https://myapp.onrender.com
	customDomains: string[];
	alias: string; // Legacy alias

	repo: string; // e.g., 'github:owner/repo'
	repoLink: string;
	repoBranch: string;
	dockerfilePath: string;
	autoDeployTrigger: "all" | "branch" | null; // ← NEW: Controls auto-deploy events

	// Instance details
	instances: {
		[key: string]: {
			// instance ID -> details
			name: string;
			type: RenderInstanceType;
			status:
				| "available"
				| "building"
				| "error"
				| "suspended"
				| "provisioning";
			createdAt: string;
		};
	};

	// Datastore-specific (conditional on serviceType)
	databaseUrl: string; // For DB services
	internalPort: number; // For private services
	ipAddress: string; // For DBs

	// Metrics/usage
	metrics: {
		cpu: number; // percentage
		memory: number; // MB
		disk: number; // MB
	};

	// Deploys
	latestDeploy: {
		id: string;
		status: "live" | "failed" | "canceled" | "pending";
		createdAt: string;
		finishedAt: string;
		build: {
			command: string;
			logUrl: string;
		};
		publish: {
			command: string;
			logUrl: string;
		};
	};

	// Other
	suspendedAt: string;
	suspendedReason: string;
	limits: {
		maxInstances: number;
		minInstances: number;
	};
	[key: string]: unknown; // For future/untyped fields
}
export interface RenderServiceResponseItem {
	cursor: string;
	service: RenderService;
}

//	Render Deploys
export interface RenderDeploy {
	id: string;
	serviceId: string;
	branch: string;
	status:
		| "created"
		| "queued"
		| "build_in_progress"
		| "update_in_progress"
		| "live"
		| "deactivated"
		| "build_failed"
		| "update_failed"
		| "canceled"
		| "pre_deploy_in_progress"
		| "pre_deploy_failed";
	buildCommand?: string;
	createdAt: string;
	startTime?: string;
	updateAvailable?: boolean;
	updateSummary?: string;
	finishedAt?: string;
	autoDeploy?: boolean;
	errorTitle?: string;
	errorBody?: string;
	buildStdout?: string;
	buildStderr?: string;
	logsUrl?: string;
	userId?: string;
}

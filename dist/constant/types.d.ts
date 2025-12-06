export type RenderServiceType = "web" | "staticSite" | "privateService" | "postgres" | "redis" | "mysql" | "keyValue" | "cronJob";
export type RenderRegion = "oregon" | "frankfurt" | "singapore" | "ohio" | "virginia";
export type RenderRuntime = "docker" | "buildCommand" | "nix" | "node" | "python" | "ruby" | "go" | "rust" | "elixir" | "php" | "java";
export type RenderPlanType = "free" | "starter" | "standard" | "team" | "professional" | "business";
export type RenderInstanceType = "web" | "backgroundWorker" | "privateService" | "cronJob";
export interface RenderPlan {
    id: string;
    type: RenderPlanType;
    name: string;
    price: number;
    unit: "month" | "hour";
    limit: number;
    features?: string[];
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
    runtime: RenderRuntime;
    region: RenderRegion;
    plan: RenderPlan;
    branch: RenderBranch;
    rootDirectory: string;
    buildCommand: string;
    startCommand: string;
    envVars: RenderEnvVar[];
    envVarsPath: string;
    autoDeploy: boolean;
    autoDeployPaused?: boolean;
    url: string;
    customDomains: string[];
    alias: string;
    repo: string;
    repoLink: string;
    repoBranch: string;
    dockerfilePath: string;
    autoDeployTrigger: "all" | "branch" | null;
    instances: {
        [key: string]: {
            name: string;
            type: RenderInstanceType;
            status: "available" | "building" | "error" | "suspended" | "provisioning";
            createdAt: string;
        };
    };
    databaseUrl: string;
    internalPort: number;
    ipAddress: string;
    metrics: {
        cpu: number;
        memory: number;
        disk: number;
    };
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
    suspendedAt: string;
    suspendedReason: string;
    limits: {
        maxInstances: number;
        minInstances: number;
    };
    [key: string]: unknown;
}
export interface RenderServiceResponseItem {
    cursor: string;
    service: RenderService;
}
export interface RenderDeploy {
    id: string;
    serviceId: string;
    branch: string;
    status: "created" | "queued" | "build_in_progress" | "update_in_progress" | "live" | "deactivated" | "build_failed" | "update_failed" | "canceled" | "pre_deploy_in_progress" | "pre_deploy_failed";
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
//# sourceMappingURL=types.d.ts.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootConfigSchema = void 0;
const zod_1 = require("zod");
const upStreamSchema = zod_1.z.object({
    id: zod_1.z.string(),
    url: zod_1.z.string().url()
});
const headerSchema = zod_1.z.object({
    id: zod_1.z.string(),
    value: zod_1.z.string()
});
const ruleSchema = zod_1.z.object({
    path: zod_1.z.string(),
    upstreams: zod_1.z.array(zod_1.z.string())
});
const serverSchema = zod_1.z.object({
    listen: zod_1.z.number(),
    wordkers: zod_1.z.number().optional(),
    upstreams: zod_1.z.array(upStreamSchema),
    headers: zod_1.z.array(headerSchema).optional(),
    rules: zod_1.z.array(ruleSchema)
});
exports.rootConfigSchema = zod_1.z.object({
    server: serverSchema
});

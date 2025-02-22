import { z } from "zod"


const upStreamSchema =  z.object({
    id: z.string(),
    url: z.string().url()
});


const headerSchema = z.object({
    id: z.string(),
    value: z.string()
})

const ruleSchema = z.object({
    path: z.string(),
    upstreams: z.array(z.string())
})

const serverSchema = z.object({
    listen: z.number(),
    wordkers: z.number().optional(),
    upstreams: z.array(upStreamSchema),
    headers: z.array(headerSchema).optional(),
    rules: z.array(ruleSchema)
})


export const rootConfigSchema = z.object({
    server: serverSchema
})
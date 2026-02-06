import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import config from "../config";
import { Role, Status } from "../constants/enum";
// import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins:[config.better_auth.app_url!],
    user: {
        additionalFields: {
            role:{
                type:'string',
                defaultValue: Role.CUSTOMER,
                required:true,
                allowedValues:[Role.CUSTOMER, Role.SELLER, Role.ADMIN],
            },
            status:{
                type:"string",
                defaultValue:Status.ACTIVE,
                required:true,
                allowedValues:[Status.ACTIVE, Status.BANNED],
            }
        }
    },
    emailAndPassword:{
        enabled:true,
        requireEmailVerification:false
    },
    socialProviders: {
        google: { 
            clientId: config.google.client_id as string, 
            clientSecret: config.google.client_secret as string, 
        }, 
    }
});
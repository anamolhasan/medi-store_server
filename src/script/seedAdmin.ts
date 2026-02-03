import { prisma } from "../lib/prisma";
import config from "../config";


async function seedAdmin() {
    try {
        console.log("***** Admin Seeding Started....")
        const adminData = {
            name: "Admin",
            email: config.admin.email!,
            role: 'ADMIN',
            password: config.admin.password!
        }
        console.log("***** Checking Admin Exist or not****")
        // check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });
// console.log('existingUser---->', existingUser)
        if (existingUser) {
            throw new Error("User already exists!!");
        }

        const signUpAdmin = await fetch(`${process.env.BASE_URL || "http://localhost:5000"}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                origin: config.better_auth.app_url || config.better_auth.app_url || "http://localhost:3000"
            },
            body: JSON.stringify(adminData)
        });

        const signUpAdminText = await signUpAdmin.text();
        console.log('-signupAdmin--->', signUpAdmin.status, signUpAdmin.statusText, signUpAdminText);


        if (signUpAdmin.ok) {
            console.log("**** Admin created")
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })

            console.log("**** Email verification status updated!")
        }
        console.log("******* SUCCESS ******")

    } catch (error) {
        console.error(error);
    }
}

seedAdmin()
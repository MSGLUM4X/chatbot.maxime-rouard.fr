import NextAuth, {Profile} from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from '@/lib/prisma'


const ALLOW_EMAIL = JSON.parse(process.env.ALLOW_EMAIL ?? "[]") as string[];
const ALLOW_DOMAINS = JSON.parse(process.env.ALLOW_DOMAINS ?? "[]") as string[];

const allowDomains = (email:string) => {
    if (ALLOW_EMAIL.includes(email)){
        return true;
    }
    const domain = email.split("@")[1];
    return ALLOW_DOMAINS.includes(domain);
}

const validEmail = (email:string|null|undefined, verified:boolean|null|undefined) => {
    if (!email || !verified){
        return false;
    }
    return allowDomains(email)
}


const handleGithubSignIn = (profile : Profile)=> {
    const email = profile.email;
    const verified = profile.email_verified;
    const verified2 = profile.verified
    console.log(email,verified, verified2)
    return true;
    return validEmail(email,verified)
}
const handleGoogleSignIn = (profile : Profile)=> {
    const email = profile.email;
    const emailVerified = profile.email_verified
    if (!email || !emailVerified){
        return false;
    }
    return allowDomains(email)
}


export const { auth, handlers, signIn, signOut  } = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    providers: [GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        authorization: {
            params: {
                prompt: "select_account",
                scope: "read:user user:email",
            },
        },
        async profile(profile, tokens) {
            const res = await fetch("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            });

            const emails: {
                email: string;
                verified: boolean;
                primary: boolean;
            }[] = await res.json();

            const verifiedAllowedEmail = emails.find(e => e.verified && allowDomains(e.email));

            if (!verifiedAllowedEmail) {
                throw new Error("EMAIL_DOMAIN_NOT_ALLOWED");
            }
            const email : string =  verifiedAllowedEmail.email

            return {
                id: profile.id.toString(),
                name: profile.name ?? profile.login,
                email: email,
                email_verified: new Date(),
                image: profile.avatar_url,
            };
        },
    }), Google],
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const isLoggedIn = !!auth?.user;
            const isOnChatbot = nextUrl.pathname.startsWith('/chatbot');
            const isOnDev = nextUrl.pathname.startsWith('/dev');
            //TODO access admin
            const isDev = true;
            if (isOnDev && isDev){
                return true;
            }
            if (isOnChatbot) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/chatbot', nextUrl));
            }
            return true;
        },
        async signIn({account, profile, user}) {
            if (!account || !profile || !profile.email) {
                return false;
            }
            let dbUser = await prisma.user.findUnique({
                where:{
                    email:profile.email
                }
            })

            if (!dbUser) {
                dbUser = await prisma.user.create({
                    data: {
                        email: profile.email,
                    },
                })
            }
            user.id = dbUser.id.toString();
            return true;
            /*
            switch (account.provider) {
                case "github":
                    return true;
                case "google":
                    return handleGoogleSignIn(profile);
                default:
                    return false;
            }
             */

        },
        jwt({ token, user }) {
            if (user) { // User is available during sign‑in
                token.id = user.id
                console.log("jwt-user")
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            return session
        },
    }
});


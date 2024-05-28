import { Session } from "next-auth";
import { NextRequest } from "next/server";

export const authConfig = {
	pages: {
		signIn: "/api/auth/signin",
	},
	providers: [],
	callbacks: {
		async authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
			const user = auth?.user;

			const isVisitingDashboard = request.nextUrl.pathname.startsWith("/dashboard");

			const isVisitingAuthPage =
				request.nextUrl.pathname.startsWith("/api/auth/signin") || request.nextUrl.pathname.startsWith("/api/auth/signin");

			if (!user && isVisitingDashboard) {
				return false;
			}

			if (user && isVisitingAuthPage) {
				return Response.redirect(new URL("/admin", request.nextUrl));
			}

			return true;
		},
	},
};
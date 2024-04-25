

export const defaultSession = {
    isLoggedIn: false,
}

export const sessionOptions = {
    password: process.env.SECRET_KEY,
    ttl: 24 * 60 * 60 * 1000,
    cookieName: "college_library",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
};

export const SERVER = process.env.SERVER_ADDRESS;

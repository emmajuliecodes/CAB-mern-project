import passport from "passport";

const jwtAuth = passport.authenticate("jwt", { session: false });

export default jwtAuth;

// Now you can add this jwtAuth Middleware function to any endpoint that only authenticated users can access. You can also use the req.user object in your controller functions, so any requests that need comparision with the current user already have access to those properties. This is much more convenient than manually sending the ._id as a body property or parameters!

// One important use for it will be to get the current logged in user object from your AuthContext. Let's create a function to check whether there is a user. We'll first check whether there is already a token in the local storage. We can create a simple utility function that will return the token. If a token is returned, then we will make a fetch to the users/me endpoint to get the user linked to the token.

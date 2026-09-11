export const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Invalid JWT Secret provided");
  }

  return secret;
};

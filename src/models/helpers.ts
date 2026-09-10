export const validateLink = (link: string) => {
  try {
    const url = new URL(link);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

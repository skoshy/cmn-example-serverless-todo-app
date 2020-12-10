let redirectVal = null;

export const redirectToExample = () => {
  const redirectPath = "/example";

  if (typeof window !== "undefined" && !redirectVal)
    redirectVal = setTimeout(() => (window.location.href = redirectPath), 500);

  return redirectPath;
};

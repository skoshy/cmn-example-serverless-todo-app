import { useRouter as useRouterOriginal, NextRouter } from "next/router"; // eslint-disable-line no-restricted-imports

export const useRouter = () => {
  const router = useRouterOriginal() ?? ({} as NextRouter);
  router.query = router.query ?? {};
  router.asPath = router.asPath ?? "";
  return router;
};

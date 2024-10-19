import { useLocation } from "react-router-dom";

export default function useCheckActiveNav() {
  const { pathname } = useLocation();

  const checkActiveNav = (nav: string) => {
    // Ensure the nav and pathname are formatted consistently
    const formattedNav = nav.replace(/^\//, "");
    const formattedPath = pathname.replace(/^\//, "");

    // Handle root case
    if (formattedNav === "") {
      return formattedPath === formattedNav;
    }

    // Check if the formattedPath starts with the formattedNav
    return formattedPath === formattedNav || formattedPath.startsWith(`/`);
  };

  return { checkActiveNav };
}

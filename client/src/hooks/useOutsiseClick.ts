import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  setShow: (arg: boolean) => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [ref]);
};

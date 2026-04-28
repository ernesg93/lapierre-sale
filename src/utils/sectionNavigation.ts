export type SectionTargetId = "config" | "specs" | "trust" | "faq";

type NavigateToSectionOptions = {
  updateHash?: boolean;
  focusTarget?: boolean;
  smooth?: boolean;
};

const isNaturallyFocusable = (element: HTMLElement) => {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "a" && element.hasAttribute("href")) return true;

  return ["button", "input", "select", "textarea"].includes(tagName);
};

export function navigateToSection(
  id: SectionTargetId,
  options: NavigateToSectionOptions = {},
) {
  const { updateHash = true, focusTarget = true, smooth = true } = options;
  const target = document.getElementById(id);

  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });

  if (updateHash) {
    window.history.replaceState(null, "", `#${id}`);
  }

  if (focusTarget) {
    if (!isNaturallyFocusable(target) && !target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }

    target.focus({ preventScroll: true });
  }

  return true;
}

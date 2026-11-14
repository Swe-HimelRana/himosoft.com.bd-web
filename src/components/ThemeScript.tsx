import { THEME_STORAGE_KEY } from "@/lib/theme";

/** Runs before paint to avoid a flash of the wrong theme. */
export function ThemeScript() {
  const code = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t==="green")document.documentElement.setAttribute("data-theme","green");else document.documentElement.removeAttribute("data-theme");}catch(e){}})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}

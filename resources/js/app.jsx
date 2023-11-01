import "./bootstrap";
import "../css/app.css";
import "../css/font.css";
import "../css/qrscanner.css";
import "react-slideshow-image/dist/styles.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "@material-tailwind/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { Provider } from "react-redux";
import Store from "./Redux/store";

library.add(fas, far, fab);

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={Store}>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

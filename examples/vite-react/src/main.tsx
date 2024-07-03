import "./styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ImportAsModule } from "./pages/import-as-module";
import { RawImport } from "./pages/raw-import";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImportAsModule />,
  },
  {
    path: "/raw-import",
    element: <RawImport />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header className="py-4">
      <nav className="grid grid-cols-2 gap-2">
        <a href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 h-10 px-4 py-2 bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
          Import as Module
        </a>
        <a href="/raw-import" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 h-10 px-4 py-2 bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
          Raw Import
        </a>
      </nav>
    </header>
    <main>
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>,
);

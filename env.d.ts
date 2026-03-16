interface ImportMetaEnv {
    readonly VITE_HOST_URL: string;
    readonly VITE_TURNSTILE_SITE_KEY: string;
    readonly VITE_TURNSTILE_SECRET_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

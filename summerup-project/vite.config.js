import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://api.themoviedb.org/3",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
                configure: (proxy, options) => {
                    proxy.on("proxyReq", (proxyReq, req, res) => {
                        proxyReq.setHeader(
                            "Authorization",
                            "Bearer " +
                                "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTVmZmU5ZDU0Y2VkYTFhOGZlMGVjNTNhYTYwNzMxNyIsInN1YiI6IjY2NDYyZGI5MzUxNjI2OTVhZTk1M2IwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CsAYMSxRGhbuDoUkigq7y2CrvYm0sy69GJhIUfvLJ90"
                        );
                        proxyReq.setHeader("accept", "application/json");
                    });
                },
            },
        },
    },
});

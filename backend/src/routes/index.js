import authRoutes from "./authRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Deu certo, index.js"))
    app.use("/auth", authRoutes)

}

export default routes;
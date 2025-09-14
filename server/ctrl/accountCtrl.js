export const signup = () => {

}

export const login = (req, res) => {
    const {privateNumber, password} = req.body;
}

export const logout = (req, res) => {
    res.clearCookie("token").json({ msg: "Logged out" });
}

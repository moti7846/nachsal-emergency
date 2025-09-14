export const signup = () => {

}

export const login = () => {

}

export const logout = (req, res) => {
    res.clearCookie("token").json({ msg: "Logged out" });
}

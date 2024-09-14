class cartController {
    authenticate(req, res) {
        return res.json({ success: true, messsage: "Authenticated successfully" });
    }
}

module.exports = new cartController();

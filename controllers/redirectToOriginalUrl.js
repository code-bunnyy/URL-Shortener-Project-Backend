import Url from "../models/Url.js";

export const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found",
            });
        }

        return res.redirect(url.originalUrl);
    } catch (error) {
        return res.status(500).json({
            message: "Could not redirect to the original URL",
        });
    }
};
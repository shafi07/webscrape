const request = require("request");
const cheerio = require("cheerio");

module.exports = {
	/**
	 * @description The incoming POST request for scrape a website url.
	 * @param {Object} req - which include the Url.
	 * @param {Object} res - The respnose have the scrapped object.
	 */

	scrape: (req, res) => {
		const { url } = req.body;

		request(url, async (error, response, responseHtml) => {
			try {
				if (error) {
					res.sendStatus(400);
				} else {
					let resObj = {};

					$ = await cheerio.load(responseHtml);

					($title = $("head title").text()),
						($desc = $('meta[name="description"]').attr("content")),
						($kwd = $('meta[name="keywords"]').attr("content")),
						($ogTitle = $('meta[property="og:title"]').attr("content")),
						($ogImage = $('meta[property="og:image"]').attr("content")),
						($ogkeywords = $('meta[property="og:keywords"]').attr("content")),
						($images = $("img"));

					if ($title) {
						resObj.title = $title;
					}

					if ($desc) {
						resObj.description = $desc;
					}

					if ($kwd) {
						resObj.keywords = $kwd;
					}

					if ($ogImage && $ogImage.length) {
						resObj.ogImage = $ogImage;
					}

					if ($ogTitle && $ogTitle.length) {
						resObj.ogTitle = $ogTitle;
					}

					if ($ogkeywords && $ogkeywords.length) {
						resObj.ogkeywords = $ogkeywords;
					}

					if ($images && $images.length) {
						resObj.images = [];

						for (var i = 0; i < $images.length; i++) {
							resObj.images.push($($images[i]).attr("src"));
						}
					}
					res.send(resObj); 
				}
			} catch (error) {
				return res.sendStatus(500);
			}
		});
	},
};

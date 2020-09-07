const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

chai.use(chaiHttp);

describe("Scrape API", () => {
	describe("POST /scrape", () => {

        // Successfull scraping.
        
		it("POST for a new web scarpe", (done) => {
			const link = {
				url:
					"https://www.amazon.in/dp/B00IMWF84G/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B00IMWF84G&pd_rd_w=RY2ug&pf_rd_p=719334a9-8cf4-4c2d-972b-46beedf42360&pd_rd_wg=Q8tuH&pf_rd_r=VNC1WWJJ03CFBYJ99RSJ&pd_rd_r=0431ff4c-1ce2-4a02-9491-9623a16c735c&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzNjBEU0M0NzlBQ0hRJmVuY3J5cHRlZElkPUExMDEwMjYyMUczMlA4WVZHOElORyZlbmNyeXB0ZWRBZElkPUEwMjg2NDI0MlVKTUlRRk1HT1AyTCZ3aWRnZXROYW1lPXNwX2RldGFpbF90aGVtYXRpYyZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=",
			};
			chai.request(server)
				.post("/scrape")
				.send(link)
				.end((err, response) => {
					response.should.have.status(200);
					response.should.be.a("object");
					done();
				});
		}).timeout(15000);

		// Request without the url

		it("POST without the url", (done) => {
			const link = {
				url: "",
			};
			chai.request(server)
				.post("/scrape")
				.send(link)
				.end((err, response) => {
					response.should.have.status(400);
					done();
				});
		}).timeout(15000);
	});
});

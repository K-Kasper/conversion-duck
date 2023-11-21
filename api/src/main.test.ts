import dotenv from "dotenv";

dotenv.config();

const url = `http://localhost:${process.env.PORT}`;

describe("Currencies API", () => {
	it("GET / --> correct format", () => {
		return fetch(url)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
				return res.json();
			})
			.then((data) => {
				expect(data).toEqual(
					expect.objectContaining({
						data: expect.any(Object),
						updatedAt: expect.any(String),
					})
				);
				expect(Object.values(data.data)).toEqual(
					expect.arrayContaining([expect.objectContaining({ name: expect.any(String), rate: expect.any(Number) })])
				);
			});
	});
});

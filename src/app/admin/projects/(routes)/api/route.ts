export async function GET(request: Request) {
	console.log(request)
	return new Response('Hello, Projects!', { status: 200 })
}

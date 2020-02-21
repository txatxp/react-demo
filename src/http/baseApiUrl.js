let apiUrl = {
	path: '/'
}
if (process.env.NODE_ENV == 'development') {
	apiUrl.path = 'https://api.github.com/'
}
export const ApiBaseUrl = apiUrl
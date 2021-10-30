addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const { searchParams } = new URL(request.url)

  searchParams.append(API_KEY_NAME, API_KEY_VALUE)

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

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

  const cachedValue = await KV_CACHE.get(`${searchParams}`)
  let response 

  if(cachedValue){
    response = cachedValue
  }else{
    const apiResponse = await fetch(`${API_BASE_URL}?${searchParams}`)
    response = JSON.stringify(apiResponse.body)
    KV_CACHE.put(`${searchParams}`, response, { expiration: 180 })
  }
  
  return new Response(response, {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const { searchParams } = new URL(request.url)

  const cacheKey = `${searchParams}`

  searchParams.append(API_KEY_NAME, API_KEY_VALUE)

  const cachedValue = await KV_CACHE.get(cacheKey)
  let response 

  if(cachedValue){
    response = cachedValue
  }else{
    const apiResponse = await fetch(`${API_BASE_URL}?${searchParams}`)
    response = JSON.stringify(await apiResponse.json())
    KV_CACHE.put(cacheKey, response, { expirationTtl: 120 })
  }
  
  return new Response(response, {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  })
}

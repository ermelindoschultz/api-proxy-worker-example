addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Protect and foward requests for an API that need secure key. 
 * @param {Request} request
 */
async function handleRequest(request) {
  const { searchParams } = new URL(request.url)

  const cacheKey = (`${searchParams}` !== "") ? `${searchParams}` : null

  searchParams.append(API_KEY_NAME, API_KEY_VALUE)

  const cachedValue = (cacheKey) ? await KV_CACHE.get(cacheKey) : null
  
  let response 
  let status = 200

  if(cachedValue){
    response = cachedValue
  }else{
    const apiResponse = await fetch(`${API_BASE_URL}?${searchParams}`)
    response = JSON.stringify(await apiResponse.json())
    if(apiResponse.status == 200){
      KV_CACHE.put(cacheKey, response, { expirationTtl: 120 })     
    }else{
      status = apiResponse.status
    }
  }
  
  return new Response(response, {
    status: status,
    headers: {
      "content-type": "application/json"
    }
  })
}

import { githubAccessTokenSchema } from '@/schema-validation/github/github-schema'

export async function githubClient(code: string) {
  const githubURL = new URL('https://github.com/login/oauth/access_token')

  githubURL.searchParams.set('client_id', 'Ov23liqqj8MTZQBWlQ1y')
  githubURL.searchParams.set(
    'client_secret',
    '9ca043bd631d4b9ded84970d297b6c5d1cae474c',
  )
  githubURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubURL.searchParams.set('code', code)

  const githubAccessTokenResponse = await fetch(githubURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })

  const githubAccessTokenData = await githubAccessTokenResponse.json()

  const { access_token: githubAccessToken } = githubAccessTokenSchema.parse(
    githubAccessTokenData,
  )

  const githubUserResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
    },
  })

  const githubUserData = await githubUserResponse.json()

  return { githubUserData }
}

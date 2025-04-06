
export const API_BASE_URL = "http://localhost:3210/api"

// Helper function for API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Get token from cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1]

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "Something went wrong")
  }

  return response.json()
}

// Auth API
export async function signUp(userData: {
  firstName: string
  lastName: string
  email: string
  gender: string
  age: number
  password: string
}) {
  return apiRequest("/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

export async function login(credentials: { email: string; password: string }) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

// Feed API
export async function getFeed() {
  const res = await apiRequest("/feed");
  return res.users; // only return the users array
}


// Profile API
export async function getProfile() {
  return apiRequest("/profile/view")
}

export async function updateProfile(profileData: any) {
  return apiRequest("/profile/update", {
    method: "POST",
    body: JSON.stringify(profileData),
  })
}

// Connections API
export async function getConnections() {
  return apiRequest("/user/connections")
}

export async function getReceivedRequests() {
  return apiRequest("/user/requests/received")
}



export async function rejectRequest(userId: string) {
  return apiRequest(`/reject/request/${userId}`, {
    method: "POST",
  })
}


const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  phone: string | null;
  city?: string | null;
  address?: string | null;
  isEmailVerified: boolean;
}

export interface AuthSuccessData {
  user: User;
  accessToken: string;
}

export interface RefreshSuccessData {
  accessToken: string;
}

export interface CategoryTreeItem {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  subcategories: CategoryTreeItem[];
}

export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  categoryId: { _id: string; name: string; slug: string } | string;
  price: number;
  originalPrice?: number;
  metal: string;
  collectionName?: string;
  tags: string[];
  images: string[];
  stock: number;
  description: string;
  weight?: string;
  dimensions?: string;
  purity?: string;
  clarity?: string;
  rating: number;
  reviewsCount: number;
}

export interface PaginatedProductsResponse {
  products: ApiProduct[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface GetProductsParams {
  category?: string;
  tags?: string;
  collection?: string;
  q?: string;
  sort?: "price" | "rating" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public error: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Essential for httpOnly cookies
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body?.message || body?.error || `Request failed with status ${response.status}`;
    throw new ApiError(response.status, body?.error || "ERROR", message);
  }

  if (body === null) {
    throw new ApiError(
      response.status,
      "INVALID_RESPONSE",
      "Response payload could not be parsed as JSON",
    );
  }

  // Our backend wraps responses in { success: true, data: ... }
  const data = body?.data !== undefined && body?.data !== null ? body.data : body;
  if (data === null) {
    throw new ApiError(
      response.status,
      "NULL_RESPONSE",
      "Server returned a null response",
    );
  }

  return data as T;
}

// ── Auth Endpoints ─────────────────────────────────────────────────────────────

export async function apiRegister(
  fullName: string,
  email: string,
  password: string,
): Promise<{ message: string }> {
  return request<{ message: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });
}

export async function apiVerifyEmail(token: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: "GET",
  });
}

export async function apiResendVerification(email: string): Promise<{ message: string }> {
  return request<{ message: string }>("/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function apiLogin(
  email: string,
  password: string,
  rememberMe?: boolean,
): Promise<AuthSuccessData> {
  return request<AuthSuccessData>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, rememberMe }),
  });
}

export async function apiLogout(accessToken?: string): Promise<{ message: string }> {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return request<{ message: string }>("/auth/logout", {
    method: "POST",
    headers,
  });
}

export async function apiRefresh(): Promise<RefreshSuccessData> {
  return request<RefreshSuccessData>("/auth/refresh", {
    method: "POST",
  });
}

export async function apiGetMe(accessToken: string): Promise<User> {
  return request<User>("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function apiUpdateProfile(
  accessToken: string,
  data: Partial<Pick<User, "fullName" | "phone" | "city" | "address">>,
): Promise<User> {
  return request<User>("/users/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}

// ── Categories & Products Endpoints ──────────────────────────────────────────

export async function apiGetCategories(): Promise<CategoryTreeItem[]> {
  return request<CategoryTreeItem[]>("/categories", {
    method: "GET",
  });
}

export async function apiGetProducts(
  params: GetProductsParams = {},
): Promise<PaginatedProductsResponse> {
  const queryParams = new URLSearchParams();
  if (params.category) queryParams.set("category", params.category);
  if (params.tags) queryParams.set("tags", params.tags);
  if (params.collection) queryParams.set("collection", params.collection);
  if (params.q) queryParams.set("q", params.q);
  if (params.sort) queryParams.set("sort", params.sort);
  if (params.order) queryParams.set("order", params.order);
  if (params.page) queryParams.set("page", params.page.toString());
  if (params.limit) queryParams.set("limit", params.limit.toString());

  const queryString = queryParams.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ""}`;

  return request<PaginatedProductsResponse>(endpoint, {
    method: "GET",
  });
}

export async function apiGetProductBySlug(slug: string): Promise<ApiProduct> {
  return request<ApiProduct>(`/products/${slug}`, {
    method: "GET",
  });
}

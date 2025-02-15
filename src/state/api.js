import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log('env',process.env.REACT_APP_BASE_URL);

const baseUrl = "http://localhost:5001";
//process.env.REACT_APP_BASE_URL
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Product",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "deleteProduct",
    "updateProduct",
    "addProduct",
    "Auth"
  ],
  endpoints: (build) => ({
    signup: build.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      providesTags: ["Auth"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["Auth"],
    }),
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getProductById: build.query({
      query: (id) => `client/product/${id}`,
      providesTags: ["Product"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `client/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["DeleteProduct"],
    }),
    updateProduct: build.mutation({
      query: ({ id, productData }) => ({
        url: `client/products/${id}`,
        method: 'PUT',  // Use PUT or PATCH depending on your use case
        body: productData,  // Send the product data in the request body
      }),
      invalidatesTags: ["UpdateProduct"],  // Optionally, you can use invalidation tags to refetch data
    }),
    addProduct: build.mutation({
      query: (formData) => ({
        url: "client/addProduct",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["addProduct"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddProductMutation,
  useSignupMutation,
  useLoginMutation,
} = api;

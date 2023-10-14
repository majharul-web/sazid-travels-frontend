import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const CUSTOMER_URL = "/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    customerSignUp: build.mutation({
      query: (loginData) => ({
        url: `${CUSTOMER_URL}/create-customer`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
});

export const { useCustomerSignUpMutation } = customerApi;

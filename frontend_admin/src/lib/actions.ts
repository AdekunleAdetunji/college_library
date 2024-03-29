import axios from "axios";

export async function register(
  endPoint: string,
  values: { uni_id: string; password: string },
  isStaff?: boolean
) {
  let res;
  if (isStaff === undefined) {
    res = await axios.post(endPoint, values);
    return res;
  }
  res = await axios.post(endPoint, { ...values, is_staff: isStaff });
  return res;
}

export async function signIn(
  endPoint: string,
  values: { uni_id: string; password: string }
) {
  const res = await axios.post(endPoint, values);
  return res;
}

export async function resetPassword(
  endPoint: string,
  values: { uni_id: string; new_password: string }
) {
  const queryParams = new URLSearchParams();
  queryParams.append("uni_id", values.uni_id);
  queryParams.append("new_password", values.new_password);
  const res = await axios.post(`${endPoint}?${queryParams.toString()}`, values);
  return res;
}

export async function validate(
  endPoint: string,
  values: { uni_id: string; email_code: string }
) {
  const queryParams = new URLSearchParams();
  queryParams.append("uni_id", values.uni_id);
  queryParams.append("email_code", values.email_code);
  const res = await axios.put(`${endPoint}?${queryParams.toString()}`, values);
  return res;
}

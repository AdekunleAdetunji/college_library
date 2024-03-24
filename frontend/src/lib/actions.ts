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
  res = await axios.post(endPoint, { ...values, is_staff: isStaff});
  return res
}

export async function signIn(
  endPoint: string,
  values: { uni_id: string; password: string }
) {
    const res = await axios.post(endPoint, values);
    return res;
}

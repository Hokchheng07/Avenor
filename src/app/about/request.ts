export type RequestField =
  | "name"
  | "email"
  | "cardNumber"
  | "subject"
  | "message"
  | "consent";

export type RequestState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<RequestField, string>>;
};

export const initialRequestState: RequestState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const readText = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

"use server";

import {
  EMAIL_RE,
  readText,
  type RequestState,
} from "@/app/about/request";

export async function submitLibraryRequest(
  _prev: RequestState,
  formData: FormData
): Promise<RequestState> {
  const name = readText(formData, "name");
  const email = readText(formData, "email");
  const cardNumber = readText(formData, "cardNumber");
  const subject = readText(formData, "subject");
  const message = readText(formData, "message");
  const consent =
    formData.get("consent") === "on" || formData.get("consent") === "true";

  const fieldErrors: RequestState["fieldErrors"] = {};

  if (name.length < 2) {
    fieldErrors.name = "Please enter your full name.";
  }

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (cardNumber.length > 24) {
    fieldErrors.cardNumber = "That card number looks too long.";
  }

  if (message.length < 10) {
    fieldErrors.message =
      "Please tell us a little more so a librarian can help (at least 10 characters).";
  }

  if (!consent) {
    fieldErrors.consent = "Please accept this before sending your request.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  console.log(
    "[library-request] received",
    JSON.stringify({ name, email, cardNumber, subject, message })
  );

  return {
    status: "success",
    message:
      "Thanks — your request is with our librarians. We reply within one working day.",
    fieldErrors: {},
  };
}

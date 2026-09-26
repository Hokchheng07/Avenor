"use client";

import { useActionState, useState } from "react";
import { subjects, subjectSlug } from "@/data/subjects";
import { submitLibraryRequest } from "@/app/about/actions";
import { initialRequestState, type RequestField } from "@/app/about/request";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 text-sm focus:outline-none focus:bg-white";

const fieldClass = (hasError: boolean) =>
  `${inputClass} ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-gray-200 focus:border-[#4A6B53]"
  }`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

export function LibraryRequestForm() {
  const [formKey, setFormKey] = useState(0);

  return (
    <LibraryRequestFormBody
      key={formKey}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

function LibraryRequestFormBody({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitLibraryRequest,
    initialRequestState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white p-8 rounded-3xl border border-[#4A6B53]/20 shadow-sm flex flex-col items-center text-center h-full justify-center"
      >
        <div className="w-14 h-14 rounded-full bg-[#4A6B53]/10 text-[#4A6B53] flex items-center justify-center mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Request received</h3>
        <p className="text-sm text-gray-600 max-w-sm">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 px-6 py-2.5 rounded-full border border-[#4A6B53]/40 text-[#4A6B53] font-semibold hover:bg-[#4A6B53]/10 transition-colors text-sm"
        >
          Send another request
        </button>
      </div>
    );
  }

  const error = (field: RequestField) => state.fieldErrors[field];
  const invalid = (field: RequestField) => Boolean(error(field));

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#4A6B53]/20 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Ask a Librarian</h3>
        <p className="text-xs text-gray-500 mt-1">
          Tell us the book you are looking for and our librarians will point you in
          the right direction
        </p>
      </div>

      <form action={formAction} className="space-y-4" noValidate>
        <p
          role="alert"
          aria-live="assertive"
          className={
            state.status === "error"
              ? "text-xs font-semibold text-red-600"
              : "sr-only"
          }
        >
          {state.status === "error" ? state.message : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">
              Member Name <span className="text-[#4A6B53]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your name"
              aria-invalid={invalid("name")}
              aria-describedby={invalid("name") ? "name-error" : undefined}
              className={fieldClass(invalid("name"))}
            />
            <FieldError id="name-error" message={error("name")} />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address <span className="text-[#4A6B53]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              aria-invalid={invalid("email")}
              aria-describedby={invalid("email") ? "email-error" : undefined}
              className={fieldClass(invalid("email"))}
            />
            <FieldError id="email-error" message={error("email")} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Library Card No.
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="e.g. AV-10245"
              aria-invalid={invalid("cardNumber")}
              aria-describedby={invalid("cardNumber") ? "cardNumber-error" : undefined}
              className={fieldClass(invalid("cardNumber"))}
            />
            <FieldError id="cardNumber-error" message={error("cardNumber")} />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Book Subject
            </label>
            <select
              id="subject"
              name="subject"
              defaultValue={subjectSlug(subjects[0].name)}
              className={`${fieldClass(false)} text-gray-600`}
            >
              {subjects.map((s) => (
                <option key={s.name} value={subjectSlug(s.name)}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-gray-700 mb-1"
          >
            How can we help? <span className="text-[#4A6B53]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Looking for a title, an author, or help finding your next read?"
            aria-invalid={invalid("message")}
            aria-describedby={invalid("message") ? "message-error" : undefined}
            className={`${fieldClass(invalid("message"))} resize-none`}
          />
          <FieldError id="message-error" message={error("message")} />
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={invalid("consent")}
              aria-describedby={invalid("consent") ? "consent-error" : undefined}
              className="rounded text-[#4A6B53] focus:ring-[#4A6B53]"
            />
            <label htmlFor="consent" className="text-xs text-gray-500">
              I agree that ISTAD Avenor may use my information to answer my request.
            </label>
          </div>
          <FieldError id="consent-error" message={error("consent")} />
        </div>

        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="px-6 py-3 rounded-full bg-[#4A6B53] text-white font-semibold hover:bg-[#3A5541] transition-all text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Ask a Librarian
            </>
          )}
        </button>
      </form>
    </div>
  );
}

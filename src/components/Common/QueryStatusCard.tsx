"use client";

type QueryStatusCardProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  state: "loading" | "error";
  className?: string;
};

const spinnerClassName =
  "inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue border-t-transparent";

export default function QueryStatusCard({
  title,
  description,
  actionLabel,
  onAction,
  state,
  className = "",
}: QueryStatusCardProps) {
  return (
    <div
      className={`rounded-[10px] border border-gray-3 bg-white px-6 py-8 shadow-1 ${className}`}
      aria-busy={state === "loading"}
      role={state === "error" ? "alert" : "status"}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-3">
            {state === "loading" ? (
              <span className={spinnerClassName} aria-hidden="true" />
            ) : (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-light-6 text-sm font-semibold text-red">
                !
              </span>
            )}
            <h2 className="text-lg font-semibold text-dark">{title}</h2>
          </div>

          {description ? (
            <p className="max-w-[560px] text-custom-sm text-dark-4">
              {description}
            </p>
          ) : null}
        </div>

        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center rounded-md bg-blue px-5 py-2.5 text-custom-sm font-medium text-white transition-colors duration-200 hover:bg-blue-dark"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

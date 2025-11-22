import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Stepper = ({ steps,step }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3 mb-6">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-medium",
                  i === step
                    ? "bg-blue-600 text-white"
                    : i < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {i + 1}
              </div>
              <div
                className={
                  i === step ? "text-sm font-semibold" : "text-sm text-gray-500"
                }
              >
                {s.label}
              </div>
              {i !== steps.length - 1 && (
                <div className="w-6 h-px bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

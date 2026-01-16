import { Checkbox } from "@/app/components/ui/checkbox";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { usePlanner } from "@/app/context/PlannerContext";

export function Step1Checklist() {
  const { data, updateChecklist } = usePlanner();

  const checklistItems = [
    "Latest report card / progress report",
    "Recent standardized test scores (state tests, MAP, i-Ready, etc.)",
    "Reading level / Lexile / F&P (if available)",
    "Math assessment data (topic tests, quizzes, diagnostics)",
    "Teacher comments or emails",
    "IEP / 504 plan (if applicable)",
    "Notes from parent–teacher conferences",
    "Your own observations from homework time"
  ];

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          STEP 1 – GATHER YOUR DATA
        </h3>
        <p className="text-gray-600">Before you start, pull together:</p>
      </div>

      <div className="space-y-3 mb-6">
        {checklistItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
            <Checkbox 
              id={`checklist-${index}`} 
              className="mt-1"
              checked={data.checklist[`item-${index}`] || false}
              onCheckedChange={(checked) => updateChecklist(`item-${index}`, checked as boolean)}
            />
            <Label 
              htmlFor={`checklist-${index}`} 
              className="text-gray-700 cursor-pointer leading-relaxed"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="extra-notes" className="text-gray-900 font-medium mb-2 block">
          Space for any extra notes:
        </Label>
        <Textarea 
          id="extra-notes"
          placeholder="Add any additional notes here..."
          className="min-h-24"
          value={data.checklist.extraNotes || ''}
          onChange={(e) => updateChecklist('extraNotes', e.target.value)}
        />
      </div>
    </section>
  );
}
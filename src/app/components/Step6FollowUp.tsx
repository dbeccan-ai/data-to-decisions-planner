import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { usePlanner } from "@/app/context/PlannerContext";

export function Step6FollowUp() {
  const { data, updateFollowUp } = usePlanner();

  const nextDecisions = [
    "Keep the same plan for another 4–6 weeks",
    "Adjust the focus areas",
    "Request a meeting with teacher / school",
    "Ask about diagnostic testing / additional supports",
    "Consider D.E.Bs LEARNING ACADEMY programs (tutoring, diagnostics, Parent Power Circle)"
  ];

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          STEP 6 – FOLLOW-UP & REFLECTION
        </h3>
        <p className="text-gray-600">Review and reflect on progress after 6–8 weeks.</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="checkin-date" className="text-gray-900 font-medium mb-2 block">
            Check-In Date:
          </Label>
          <Input 
            id="checkin-date"
            type="date" 
            className="max-w-xs"
            value={data.followUp.checkInDate}
            onChange={(e) => updateFollowUp('checkInDate', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="improvements" className="text-gray-900 font-medium mb-2 block">
            What improved over the last 6–8 weeks?
          </Label>
          <Textarea 
            id="improvements"
            placeholder="Describe what's gotten better..."
            className="min-h-24"
            value={data.followUp.improvements}
            onChange={(e) => updateFollowUp('improvements', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="still-hard" className="text-gray-900 font-medium mb-2 block">
            What is still hard for my child?
          </Label>
          <Textarea 
            id="still-hard"
            placeholder="Note ongoing challenges..."
            className="min-h-24"
            value={data.followUp.stillHard}
            onChange={(e) => updateFollowUp('stillHard', e.target.value)}
          />
        </div>

        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">
            Next decisions (check all that apply):
          </h4>
          <div className="space-y-3">
            {nextDecisions.map((decision, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox 
                  id={`decision-${index}`} 
                  className="mt-1"
                  checked={data.followUp.decisions[`decision-${index}`] || false}
                  onCheckedChange={(checked) => updateFollowUp(`decision-${index}`, checked as boolean)}
                />
                <Label 
                  htmlFor={`decision-${index}`}
                  className="text-gray-700 cursor-pointer leading-relaxed"
                >
                  {decision}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="signature" className="text-gray-900 font-medium mb-2 block">
                Signature (Parent/Guardian):
              </Label>
              <Input 
                id="signature"
                placeholder="Sign here"
                value={data.followUp.signature}
                onChange={(e) => updateFollowUp('signature', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="signature-date" className="text-gray-900 font-medium mb-2 block">
                Date:
              </Label>
              <Input 
                id="signature-date"
                type="date"
                value={data.followUp.signatureDate}
                onChange={(e) => updateFollowUp('signatureDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
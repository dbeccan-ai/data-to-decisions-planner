import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { usePlanner } from "@/app/context/PlannerContext";

export function Step3Patterns() {
  const { data, updatePatterns, updatePriority } = usePlanner();

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          STEP 3 – PATTERNS & PRIORITIES
        </h3>
        <p className="text-gray-600">Look across the chart and decide what really matters for the next 6–8 weeks.</p>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-4 text-lg">A. What patterns do you notice?</h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="strongest-subjects" className="text-gray-900 font-medium mb-2 block">
              Subjects that look strongest:
            </Label>
            <Input 
              id="strongest-subjects"
              placeholder="e.g., Reading, Science"
              value={data.patterns.strongest}
              onChange={(e) => updatePatterns('strongest', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="concerning-subjects" className="text-gray-900 font-medium mb-2 block">
              Subjects that worry you the most:
            </Label>
            <Input 
              id="concerning-subjects"
              placeholder="e.g., Math, Writing"
              value={data.patterns.concerning}
              onChange={(e) => updatePatterns('concerning', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="behavior-notes" className="text-gray-900 font-medium mb-2 block">
              Any behavior or effort notes that keep repeating?
            </Label>
            <Textarea 
              id="behavior-notes"
              placeholder="Note any patterns in behavior or effort across subjects"
              className="min-h-20"
              value={data.patterns.behavior}
              onChange={(e) => updatePatterns('behavior', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-lg">B. Top 3 Priority Areas</h4>
        <p className="text-sm text-gray-600 mb-4 italic">
          Choose no more than three. We're going for focus, not overwhelm.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300 w-20">
                  Priority #
                </th>
                <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                  Area / Skill (be specific)
                </th>
                <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                  Why this matters right now
                </th>
                <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                  Data that tells me this is important
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((num) => (
                <tr key={num} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center font-semibold text-blue-600">
                    {num}
                  </td>
                  <td className="p-3">
                    <Input 
                      placeholder="e.g., Reading comprehension"
                      value={data.patterns.priorities[num]?.area || ''}
                      onChange={(e) => updatePriority(num, 'area', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <Textarea 
                      placeholder="Why focus on this now?"
                      className="min-h-20"
                      value={data.patterns.priorities[num]?.why || ''}
                      onChange={(e) => updatePriority(num, 'why', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <Textarea 
                      placeholder="What data supports this?"
                      className="min-h-20"
                      value={data.patterns.priorities[num]?.data || ''}
                      onChange={(e) => updatePriority(num, 'data', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
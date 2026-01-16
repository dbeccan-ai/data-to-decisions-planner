import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { usePlanner } from "@/app/context/PlannerContext";

export function Step5Questions() {
  const { data, updateQuestion } = usePlanner();

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          STEP 5 – QUESTIONS TO BRING BACK TO SCHOOL
        </h3>
        <p className="text-gray-600">Use this for emails, parent–teacher conferences, or quick check-ins.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Question I Want to Ask the Teacher / School
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300 w-48">
                Best Person to Ask
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300 w-48">
                How I'll Ask
                <div className="text-xs font-normal text-gray-600">(email, note, meeting)</div>
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300 w-32">
                Date Asked
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Response / Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((num) => (
              <tr key={num} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <Textarea 
                    placeholder="Your question here..."
                    className="min-h-20"
                    value={data.questions[num]?.question || ''}
                    onChange={(e) => updateQuestion(num, 'question', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <Input 
                    placeholder="e.g., Math teacher"
                    value={data.questions[num]?.person || ''}
                    onChange={(e) => updateQuestion(num, 'person', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <Input 
                    placeholder="e.g., Email"
                    value={data.questions[num]?.method || ''}
                    onChange={(e) => updateQuestion(num, 'method', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <Input 
                    type="date"
                    value={data.questions[num]?.dateAsked || ''}
                    onChange={(e) => updateQuestion(num, 'dateAsked', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <Textarea 
                    placeholder="Response received..."
                    className="min-h-20"
                    value={data.questions[num]?.response || ''}
                    onChange={(e) => updateQuestion(num, 'response', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-gray-900 mb-2">Prompt ideas for questions to ask:</h4>
        <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
          <li>"What 1–2 skills should we focus on first at home?"</li>
          <li>"How will I know my child is improving?"</li>
          <li>"Are there school supports—lab, small group, tutoring—that we should use?"</li>
        </ul>
      </div>
    </section>
  );
}
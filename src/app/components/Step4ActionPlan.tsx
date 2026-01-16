import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { usePlanner } from "@/app/context/PlannerContext";

export function Step4ActionPlan() {
  const { data, updateAction } = usePlanner();

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          STEP 4 – 6–8 WEEK ACTION PLAN (BY PRIORITY)
        </h3>
        <p className="text-gray-600">Use one row per priority. Think "small, consistent actions," not perfection.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300 w-32">
                Priority Area
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Goal for the Next 6–8 Weeks
                <div className="text-xs font-normal text-gray-600">(clear & realistic)</div>
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                What We'll Do at Home
                <div className="text-xs font-normal text-gray-600">(2–3 actions)</div>
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Support from School / DE.Bs / Tutor
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                How We'll Track Progress
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300 w-32">
                Check-In Date
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
                  <Textarea 
                    placeholder="e.g., Raise reading level from J to K"
                    className="min-h-24"
                    value={data.actions[num]?.goal || ''}
                    onChange={(e) => updateAction(num, 'goal', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <div className="space-y-2">
                    <Input 
                      placeholder="• Action 1" 
                      className="text-sm"
                      value={data.actions[num]?.action1 || ''}
                      onChange={(e) => updateAction(num, 'action1', e.target.value)}
                    />
                    <Input 
                      placeholder="• Action 2" 
                      className="text-sm"
                      value={data.actions[num]?.action2 || ''}
                      onChange={(e) => updateAction(num, 'action2', e.target.value)}
                    />
                    <Input 
                      placeholder="• Action 3" 
                      className="text-sm"
                      value={data.actions[num]?.action3 || ''}
                      onChange={(e) => updateAction(num, 'action3', e.target.value)}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <Textarea 
                    placeholder="What support will you request?"
                    className="min-h-24"
                    value={data.actions[num]?.support || ''}
                    onChange={(e) => updateAction(num, 'support', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <Textarea 
                    placeholder="How will you measure progress?"
                    className="min-h-24"
                    value={data.actions[num]?.tracking || ''}
                    onChange={(e) => updateAction(num, 'tracking', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <Input 
                    type="date"
                    value={data.actions[num]?.checkInDate || ''}
                    onChange={(e) => updateAction(num, 'checkInDate', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-gray-900 mb-2">Examples to guide you:</h4>
        <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
          <li>"Raise reading level from Level J to Level K."</li>
          <li>"Finish all math homework with no more than one adult reminder."</li>
          <li>"Reduce missing assignments in ELA from 5 to 0."</li>
        </ul>
      </div>
    </section>
  );
}
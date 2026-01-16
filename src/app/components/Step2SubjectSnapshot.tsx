import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { usePlanner } from "@/app/context/PlannerContext";

interface SubjectRowProps {
  subject: string;
  isCustom?: boolean;
}

function SubjectRow({ subject, isCustom = false }: SubjectRowProps) {
  const { data, updateSubject } = usePlanner();
  const subjectId = subject.toLowerCase().replace(/[^a-z]/g, '-');
  const subjectData = data.subjects[subject] || { grade: '', dataPoints: '', teacherComment: '', rating: '', concerns: '' };
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 font-medium text-gray-900">
        {isCustom ? (
          <Input 
            placeholder="Other: __________"
            className="w-full"
            value={subjectData.grade}
            onChange={(e) => updateSubject(subject, 'grade', e.target.value)}
          />
        ) : (
          subject
        )}
      </td>
      <td className="p-3">
        <Input 
          placeholder="Enter grade/level"
          value={subjectData.grade}
          onChange={(e) => updateSubject(subject, 'grade', e.target.value)}
        />
      </td>
      <td className="p-3">
        <Input 
          placeholder="Test scores, data points"
          value={subjectData.dataPoints}
          onChange={(e) => updateSubject(subject, 'dataPoints', e.target.value)}
        />
      </td>
      <td className="p-3">
        <Textarea 
          placeholder="Teacher comment summary" 
          className="min-h-16 text-sm"
          value={subjectData.teacherComment}
          onChange={(e) => updateSubject(subject, 'teacherComment', e.target.value)}
        />
      </td>
      <td className="p-3">
        <RadioGroup 
          value={subjectData.rating} 
          onValueChange={(value) => updateSubject(subject, 'rating', value)}
          className="flex gap-2"
        >
          <div className="flex items-center gap-1">
            <RadioGroupItem 
              value="green" 
              id={`${subjectId}-green`}
              className="border-green-500 text-green-500"
            />
            <Label 
              htmlFor={`${subjectId}-green`}
              className="text-xs cursor-pointer text-green-600"
            >
              Green
            </Label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem 
              value="yellow" 
              id={`${subjectId}-yellow`}
              className="border-yellow-500 text-yellow-500"
            />
            <Label 
              htmlFor={`${subjectId}-yellow`}
              className="text-xs cursor-pointer text-yellow-600"
            >
              Yellow
            </Label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem 
              value="red" 
              id={`${subjectId}-red`}
              className="border-red-500 text-red-500"
            />
            <Label 
              htmlFor={`${subjectId}-red`}
              className="text-xs cursor-pointer text-red-600"
            >
              Red
            </Label>
          </div>
        </RadioGroup>
      </td>
      <td className="p-3">
        <Textarea 
          placeholder="Questions or concerns" 
          className="min-h-16 text-sm"
          value={subjectData.concerns}
          onChange={(e) => updateSubject(subject, 'concerns', e.target.value)}
        />
      </td>
    </tr>
  );
}

export function Step2SubjectSnapshot() {
  const subjects = [
    "Reading / ELA",
    "Math",
    "Science",
    "Social Studies",
    "Writing",
    "Behavior / Effort"
  ];

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          STEP 2 – SUBJECT SNAPSHOT (DATA OVERVIEW)
        </h3>
        <p className="text-gray-600">Use this page to see everything in one place before you decide what to focus on.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Subject
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Current Grade / Level
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Recent Data Points
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Teacher Comment
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Parent Rating*
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 border border-gray-300">
                Questions / Concerns
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <SubjectRow key={subject} subject={subject} />
            ))}
            <SubjectRow subject="Other" isCustom />
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2">Parent Rating Key</h4>
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span><strong>Green</strong> – On track / no major concerns</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span><strong>Yellow</strong> – Some concern / watch closely</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span><strong>Red</strong> – Needs support now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
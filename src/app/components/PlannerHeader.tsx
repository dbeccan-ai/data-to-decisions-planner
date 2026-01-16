import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { usePlanner } from "@/app/context/PlannerContext";

export function PlannerHeader() {
  const { data, updateHeader } = usePlanner();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 print:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">DE.Bs LEARNING ACADEMY</h1>
        <h2 className="text-2xl mb-6">Data-to-Decisions Planner</h2>
        <p className="text-lg mb-8 max-w-3xl">
          Turn grades, test scores, and teacher comments into clear next steps for the next 6–8 weeks.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <div>
            <Label htmlFor="parent-name" className="text-white text-sm mb-2 block">
              Parent Name:
            </Label>
            <Input 
              id="parent-name" 
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Enter parent name"
              value={data.header.parentName}
              onChange={(e) => updateHeader('parentName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="student-name" className="text-white text-sm mb-2 block">
              Student Name:
            </Label>
            <Input 
              id="student-name" 
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Enter student name"
              value={data.header.studentName}
              onChange={(e) => updateHeader('studentName', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="grade" className="text-white text-sm mb-2 block">
                Grade:
              </Label>
              <Input 
                id="grade" 
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                placeholder="Grade"
                value={data.header.grade}
                onChange={(e) => updateHeader('grade', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-white text-sm mb-2 block">
                Date:
              </Label>
              <Input 
                id="date" 
                type="date"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                value={data.header.date}
                onChange={(e) => updateHeader('date', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
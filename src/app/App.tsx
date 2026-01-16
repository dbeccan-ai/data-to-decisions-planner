import { PlannerProvider, usePlanner } from "@/app/context/PlannerContext";
import { PlannerHeader } from "@/app/components/PlannerHeader";
import { Step1Checklist } from "@/app/components/Step1Checklist";
import { Step2SubjectSnapshot } from "@/app/components/Step2SubjectSnapshot";
import { Step3Patterns } from "@/app/components/Step3Patterns";
import { Step4ActionPlan } from "@/app/components/Step4ActionPlan";
import { Step5Questions } from "@/app/components/Step5Questions";
import { Step6FollowUp } from "@/app/components/Step6FollowUp";
import { Button } from "@/app/components/ui/button";
import { Printer, RotateCcw, Save, Database } from "lucide-react";
import { toast, Toaster } from "sonner";
import { supabase } from "@/supabaseClient";

function PlannerContent() {
  const { data, clearAllData } = usePlanner();

  const handlePrint = () => {
    window.print();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllData();
      toast.success('All data has been cleared');
    }
  };

  const handleSaveNotification = () => {
    toast.success('Your progress is automatically saved to your browser');
  };

  // NEW: Save to Supabase database
  const handleSaveToDatabase = async () => {
    try {
      const { error } = await supabase
        .from('planner_submissions')
        .insert([
          {
            parent_name: data.header.parentName,
            student_name: data.header.studentName,
            grade: data.header.grade,
            date: data.header.date,
            // Store all form data as JSON
            form_data: JSON.stringify(data),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        toast.error('Failed to save to database');
        console.error('Error:', error);
      } else {
        toast.success('✅ Successfully saved to database!');
        console.log('Data saved to Supabase');
      }
    } catch (err) {
      toast.error('Error connecting to database');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PlannerHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Action buttons - hidden when printing */}
        <div className="mb-6 flex flex-wrap gap-3 justify-end print:hidden">
          <Button 
            onClick={handleSaveNotification}
            variant="outline"
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          >
            <Save className="mr-2 h-4 w-4" />
            Auto-Saved
          </Button>
          
          {/* NEW DATABASE SAVE BUTTON */}
          <Button 
            onClick={handleSaveToDatabase}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Database className="mr-2 h-4 w-4" />
            Save to Database
          </Button>

          <Button 
            onClick={handleClearData}
            variant="outline"
            className="text-red-600 hover:bg-red-50 border-red-200"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear All Data
          </Button>
          <Button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Planner
          </Button>
        </div>

        {/* Auto-save indicator */}
        <div className="mb-4 text-sm text-gray-600 text-center print:hidden">
          💾 Your progress is automatically saved to your browser
        </div>

        <Step1Checklist />
        <Step2SubjectSnapshot />
        <Step3Patterns />
        <Step4ActionPlan />
        <Step5Questions />
        <Step6FollowUp />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 pb-8">
          <p>© {new Date().getFullYear()} DE.Bs LEARNING ACADEMY</p>
          <p className="mt-1">Empowering parents to turn data into action</p>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <PlannerProvider>
      <PlannerContent />
      <Toaster position="top-center" richColors />
    </PlannerProvider>
  );
}
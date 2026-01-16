import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HeaderData {
  parentName: string;
  studentName: string;
  grade: string;
  date: string;
}

interface ChecklistData {
  [key: string]: boolean;
  extraNotes: string;
}

interface SubjectData {
  grade: string;
  dataPoints: string;
  teacherComment: string;
  rating: string;
  concerns: string;
}

interface SubjectsData {
  [key: string]: SubjectData;
}

interface PriorityData {
  area: string;
  why: string;
  data: string;
}

interface PatternsData {
  strongest: string;
  concerning: string;
  behavior: string;
  priorities: {
    [key: number]: PriorityData;
  };
}

interface ActionPlanData {
  goal: string;
  action1: string;
  action2: string;
  action3: string;
  support: string;
  tracking: string;
  checkInDate: string;
}

interface ActionsData {
  [key: number]: ActionPlanData;
}

interface QuestionData {
  question: string;
  person: string;
  method: string;
  dateAsked: string;
  response: string;
}

interface QuestionsData {
  [key: number]: QuestionData;
}

interface FollowUpData {
  checkInDate: string;
  improvements: string;
  stillHard: string;
  decisions: {
    [key: string]: boolean;
  };
  signature: string;
  signatureDate: string;
}

interface PlannerData {
  header: HeaderData;
  checklist: ChecklistData;
  subjects: SubjectsData;
  patterns: PatternsData;
  actions: ActionsData;
  questions: QuestionsData;
  followUp: FollowUpData;
}

interface PlannerContextType {
  data: PlannerData;
  updateHeader: (field: keyof HeaderData, value: string) => void;
  updateChecklist: (field: string, value: boolean | string) => void;
  updateSubject: (subject: string, field: keyof SubjectData, value: string) => void;
  updatePatterns: (field: string, value: string) => void;
  updatePriority: (num: number, field: keyof PriorityData, value: string) => void;
  updateAction: (num: number, field: keyof ActionPlanData, value: string) => void;
  updateQuestion: (num: number, field: keyof QuestionData, value: string) => void;
  updateFollowUp: (field: string, value: string | boolean) => void;
  clearAllData: () => void;
}

const STORAGE_KEY = 'debs-planner-data';

const defaultData: PlannerData = {
  header: {
    parentName: '',
    studentName: '',
    grade: '',
    date: '',
  },
  checklist: {
    extraNotes: '',
  },
  subjects: {},
  patterns: {
    strongest: '',
    concerning: '',
    behavior: '',
    priorities: {
      1: { area: '', why: '', data: '' },
      2: { area: '', why: '', data: '' },
      3: { area: '', why: '', data: '' },
    },
  },
  actions: {
    1: { goal: '', action1: '', action2: '', action3: '', support: '', tracking: '', checkInDate: '' },
    2: { goal: '', action1: '', action2: '', action3: '', support: '', tracking: '', checkInDate: '' },
    3: { goal: '', action1: '', action2: '', action3: '', support: '', tracking: '', checkInDate: '' },
  },
  questions: {
    1: { question: '', person: '', method: '', dateAsked: '', response: '' },
    2: { question: '', person: '', method: '', dateAsked: '', response: '' },
    3: { question: '', person: '', method: '', dateAsked: '', response: '' },
  },
  followUp: {
    checkInDate: '',
    improvements: '',
    stillHard: '',
    decisions: {},
    signature: '',
    signatureDate: '',
  },
};

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PlannerData>(() => {
    // Load from localStorage on initial mount
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultData, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading planner data:', error);
    }
    return defaultData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving planner data:', error);
    }
  }, [data]);

  const updateHeader = (field: keyof HeaderData, value: string) => {
    setData(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }));
  };

  const updateChecklist = (field: string, value: boolean | string) => {
    setData(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [field]: value },
    }));
  };

  const updateSubject = (subject: string, field: keyof SubjectData, value: string) => {
    setData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: {
          ...prev.subjects[subject],
          [field]: value,
        },
      },
    }));
  };

  const updatePatterns = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      patterns: { ...prev.patterns, [field]: value },
    }));
  };

  const updatePriority = (num: number, field: keyof PriorityData, value: string) => {
    setData(prev => ({
      ...prev,
      patterns: {
        ...prev.patterns,
        priorities: {
          ...prev.patterns.priorities,
          [num]: {
            ...prev.patterns.priorities[num],
            [field]: value,
          },
        },
      },
    }));
  };

  const updateAction = (num: number, field: keyof ActionPlanData, value: string) => {
    setData(prev => ({
      ...prev,
      actions: {
        ...prev.actions,
        [num]: {
          ...prev.actions[num],
          [field]: value,
        },
      },
    }));
  };

  const updateQuestion = (num: number, field: keyof QuestionData, value: string) => {
    setData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [num]: {
          ...prev.questions[num],
          [field]: value,
        },
      },
    }));
  };

  const updateFollowUp = (field: string, value: string | boolean) => {
    if (field.startsWith('decision-')) {
      setData(prev => ({
        ...prev,
        followUp: {
          ...prev.followUp,
          decisions: {
            ...prev.followUp.decisions,
            [field]: value as boolean,
          },
        },
      }));
    } else {
      setData(prev => ({
        ...prev,
        followUp: { ...prev.followUp, [field]: value },
      }));
    }
  };

  const clearAllData = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PlannerContext.Provider
      value={{
        data,
        updateHeader,
        updateChecklist,
        updateSubject,
        updatePatterns,
        updatePriority,
        updateAction,
        updateQuestion,
        updateFollowUp,
        clearAllData,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
}

export interface task {
  title: string;
  description?: string;
  status:string;
  priority: string
}

export interface reminder {
  reminder_id: number;
  task_id?: number;
  note_id?: number;
  reminder_time:string;
  repeat_frequency:string
}

export interface note {
  content: string;
  task_id: number;
  note_id: number;
}
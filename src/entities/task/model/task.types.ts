export interface TaskState {
  isEditing: boolean
}

export interface Task extends TaskState {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

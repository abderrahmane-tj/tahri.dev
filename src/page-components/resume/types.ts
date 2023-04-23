export type Task =
  | string
  | {
      task: string
      subTasks: string[]
    }

export type Position = {
  title: string
  tasks: Task[]
  skill?: string[]
  startDate?: string
  endDate?: string
}

export type Employment = {
  employerName: string
  employmentType: string
  location: string
  locationType: string
  startDate: string
  endDate?: string
  excerpt?: string
  positions: [Position] | Position[]
}

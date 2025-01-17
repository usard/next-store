export type actionFunction= (prevState:any, formData: FormData) => Promise<{message: string}>
export type actionType = 'edit' | 'delete';